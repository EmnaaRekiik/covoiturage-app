
using Covoiturage.DTOs.Trajet;
using Covoiturage.Entities;
using Covoiturage.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Covoiturage.Services;

public class TrajetService
{
    private readonly ITrajetRepository _trajets;
    private readonly IVehiculeRepository _vehicules;
    private readonly IUserRepository _users;

    public TrajetService(ITrajetRepository trajets, IVehiculeRepository vehicules, IUserRepository users)
    {
        _trajets = trajets;
        _vehicules = vehicules;
        _users = users;
    }

    public async Task<(bool ok, object result)> CreateAsync(Guid userId, CreateTrajetDTO dto)
    {
        var user = await _users.GetByIdAsync(userId);
        if (user == null) return (false, "User not found.");
        if (!user.IsDriverApproved) return (false, "Only approved drivers can publish trips.");

        var vehicule = await _vehicules.GetByIdAsync(dto.VehiculeId);
        if (vehicule == null) return (false, "Vehicle not found.");
        if (vehicule.ConducteurId != userId) return (false, "Vehicle does not belong to this driver.");
        if (!vehicule.IsActive) return (false, "Vehicle is inactive.");
        if (dto.PlacesDisponibles <= 0) return (false, "Available seats must be greater than 0.");
        if (dto.PlacesDisponibles > vehicule.NombrePlaces) return (false, "Available seats cannot exceed vehicle capacity.");

        var trajet = new Trajet
        {
            ConducteurId = userId,
            VehiculeId = dto.VehiculeId,
            VilleDepart = dto.VilleDepart.Trim(),
            VilleDestination = dto.VilleDestination.Trim(),
            HeureDepart = dto.HeureDepart,
            Prix = dto.Prix,
            PlacesDisponibles = dto.PlacesDisponibles,
            Arrets = dto.Arrets,
            Preferences = dto.Preferences,
            Status = dto.PlacesDisponibles > 0 ? TrajetStatus.Published : TrajetStatus.Full
        };

        await _trajets.AddAsync(trajet);
        await _trajets.SaveAsync();

        return (true, trajet);
    }

    public async Task<object?> GetByIdAsync(Guid id)
    {
        var t = await _trajets.GetByIdAsync(id);
        if (t == null) return null;

        return new
        {
            t.Id,
            t.VilleDepart,
            t.VilleDestination,
            t.HeureDepart,
            t.Prix,
            t.PlacesDisponibles,
            t.Arrets,
            t.Preferences,
            t.Status,
            Driver = new
            {
                t.Conducteur.Id,
                t.Conducteur.Utilisateur.NomComplet,
                t.Conducteur.ExperienceAnnees
            },
            Vehicule = new
            {
                t.Vehicule.Id,
                t.Vehicule.Marque,
                t.Vehicule.Modele,
                t.Vehicule.Couleur,
                t.Vehicule.NombrePlaces,
                t.Vehicule.Confort
            }
        };
    }

    public async Task<List<object>> SearchSimpleAsync(string from, string to, DateTime date)
    {
        var start = date.Date;
        var end = start.AddDays(1);

        return await _trajets.Query()
            .Where(t => t.VilleDepart == from && t.VilleDestination == to)
            .Where(t => t.HeureDepart >= start && t.HeureDepart < end)
            .Where(t => t.Status == TrajetStatus.Published || t.Status == TrajetStatus.Full)
            .OrderBy(t => t.HeureDepart)
            .Select(t => new
            {
                t.Id,
                t.VilleDepart,
                t.VilleDestination,
                t.HeureDepart,
                t.Prix,
                t.PlacesDisponibles,
                DriverName = t.Conducteur.Utilisateur.NomComplet,
                Vehicule = $"{t.Vehicule.Marque} {t.Vehicule.Modele} - {t.Vehicule.Couleur}"
            })
            .Cast<object>()
            .ToListAsync();
    }

    public async Task<List<object>> SearchAdvancedAsync(
        string from,
        string to,
        DateTime date,
        decimal? priceMin,
        decimal? priceMax,
        TimeSpan? timeFrom,
        TimeSpan? timeTo,
        string? confort,
        string? preferences,
        string? arrets)
    {
        var start = date.Date;
        var end = start.AddDays(1);

        var q = _trajets.Query()
            .Where(t => t.VilleDepart == from && t.VilleDestination == to)
            .Where(t => t.HeureDepart >= start && t.HeureDepart < end)
            .Where(t => t.Status == TrajetStatus.Published || t.Status == TrajetStatus.Full);

        if (priceMin.HasValue) q = q.Where(t => t.Prix >= priceMin.Value);
        if (priceMax.HasValue) q = q.Where(t => t.Prix <= priceMax.Value);
        if (timeFrom.HasValue) q = q.Where(t => t.HeureDepart.TimeOfDay >= timeFrom.Value);
        if (timeTo.HasValue) q = q.Where(t => t.HeureDepart.TimeOfDay <= timeTo.Value);
        if (!string.IsNullOrWhiteSpace(confort)) q = q.Where(t => (t.Vehicule.Confort ?? "").Contains(confort));
        if (!string.IsNullOrWhiteSpace(preferences)) q = q.Where(t => (t.Preferences ?? "").Contains(preferences));
        if (!string.IsNullOrWhiteSpace(arrets)) q = q.Where(t => (t.Arrets ?? "").Contains(arrets));

        return await q
            .OrderBy(t => t.HeureDepart)
            .Select(t => new
            {
                t.Id,
                t.VilleDepart,
                t.VilleDestination,
                t.HeureDepart,
                t.Prix,
                t.PlacesDisponibles,
                t.Arrets,
                t.Preferences,
                DriverName = t.Conducteur.Utilisateur.NomComplet,
                Vehicule = $"{t.Vehicule.Marque} {t.Vehicule.Modele} - {t.Vehicule.Couleur}",
                Confort = t.Vehicule.Confort
            })
            .Cast<object>()
            .ToListAsync();
    }

    public async Task<List<object>> GetMineAsync(Guid userId)
    {
        return await _trajets.Query()
            .Where(t => t.ConducteurId == userId)
            .OrderByDescending(t => t.HeureDepart)
            .Select(t => new
            {
                t.Id,
                t.VilleDepart,
                t.VilleDestination,
                t.HeureDepart,
                t.Prix,
                t.PlacesDisponibles,
                t.Status,
                Vehicule = $"{t.Vehicule.Marque} {t.Vehicule.Modele}"
            })
            .Cast<object>()
            .ToListAsync();
    }

    public async Task<(bool ok, object result)> UpdateAsync(Guid userId, Guid trajetId, UpdateTrajetDTO dto)
    {
        var trajet = await _trajets.GetByIdAsync(trajetId);
        if (trajet == null) return (false, "Trip not found.");

        // Make sure this trip belongs to the driver making the request
        if (trajet.ConducteurId != userId) return (false, "You don't own this trip.");

        if (trajet.Status == TrajetStatus.Cancelled) return (false, "Cannot update a cancelled trip.");
        if (trajet.Status == TrajetStatus.Completed) return (false, "Cannot update a completed trip.");

        if (dto.HeureDepart.HasValue) trajet.HeureDepart = dto.HeureDepart.Value;
        if (dto.Prix.HasValue) trajet.Prix = dto.Prix.Value;
        if (dto.Arrets != null) trajet.Arrets = dto.Arrets;
        if (dto.Preferences != null) trajet.Preferences = dto.Preferences;

        if (dto.PlacesDisponibles.HasValue)
        {
           
            var reservedSeats = trajet.Reservations
                .Where(r => r.Status == ReservationStatus.Accepted)
                .Sum(r => r.NombrePlaces);

            if (dto.PlacesDisponibles.Value < reservedSeats)
                return (false, $"Cannot set seats below already accepted reservations ({reservedSeats} seats taken).");

            trajet.PlacesDisponibles = dto.PlacesDisponibles.Value;
        }

        await _trajets.SaveAsync();
        return (true, trajet);
    }

    public async Task<(bool ok, string message)> CancelAsync(Guid userId, Guid trajetId)
    {
        var trajet = await _trajets.GetByIdAsync(trajetId);
        if (trajet == null) return (false, "Trip not found.");

        if (trajet.ConducteurId != userId) return (false, "You don't own this trip.");

        if (trajet.Status == TrajetStatus.Cancelled) return (false, "Trip is already cancelled.");
        if (trajet.Status == TrajetStatus.Completed) return (false, "Cannot cancel a completed trip.");

        trajet.Status = TrajetStatus.Cancelled;

        foreach (var reservation in trajet.Reservations
            .Where(r => r.Status == ReservationStatus.Pending || r.Status == ReservationStatus.Accepted))
        {
            reservation.Status = ReservationStatus.Cancelled;
        }

        await _trajets.SaveAsync();
        return (true, "Trip cancelled successfully.");
    }

}