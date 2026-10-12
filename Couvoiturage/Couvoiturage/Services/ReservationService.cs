using Covoiturage.Data;
using Covoiturage.DTOs.Reservation;
using Covoiturage.Entities;
using Covoiturage.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Covoiturage.Services;

public class ReservationService
{
    private readonly AppDbContext _db;
    private readonly IReservationRepository _reservations;
    private readonly ITrajetRepository _trajets;
    private readonly IUserRepository _users;

    public ReservationService(
        AppDbContext db,
        IReservationRepository reservations,
        ITrajetRepository trajets,
        IUserRepository users)
    {
        _db = db;
        _reservations = reservations;
        _trajets = trajets;
        _users = users;
    }

    public async Task<(bool ok, object result)> CreateAsync(Guid userId, CreateReservationDTO dto)
    {
        var user = await _users.GetByIdAsync(userId);
        if (user == null) return (false, "User not found.");
        if (user.IsBlocked) return (false, "Blocked user cannot reserve.");

        var trajet = await _trajets.GetByIdAsync(dto.TrajetId);
        if (trajet == null) return (false, "Trip not found.");
        if (trajet.ConducteurId == userId) return (false, "Driver cannot reserve their own trip.");
        if (trajet.Status != TrajetStatus.Published && trajet.Status != TrajetStatus.Full)
            return (false, "Trip is not reservable.");

        if (dto.NombrePlaces <= 0) return (false, "Invalid seat count.");
        if (dto.Companions.Count != dto.NombrePlaces - 1)
            return (false, "Companion count must equal number of extra seats.");
        if (dto.NombrePlaces > trajet.PlacesDisponibles)
            return (false, "Not enough available seats.");

        var alreadyExists = await _reservations.Query()
            .AnyAsync(r => r.TrajetId == dto.TrajetId && r.PassagerId == userId);

        if (alreadyExists) return (false, "You already have a reservation for this trip.");

        var reservation = new Reservation
        {
            TrajetId = dto.TrajetId,
            PassagerId = userId,
            NombrePlaces = dto.NombrePlaces,
            Status = ReservationStatus.Pending,
            Companions = dto.Companions.Select(c => new ReservationCompanion
            {
                NomComplet = c.NomComplet.Trim(),
                Telephone = c.Telephone.Trim(),
                Email = string.IsNullOrWhiteSpace(c.Email) ? null : c.Email.Trim()
            }).ToList()
        };

        await _reservations.AddAsync(reservation);
        await _reservations.SaveAsync();

        return (true, reservation);
    }

    public async Task<(bool ok, string message)> AcceptAsync(Guid reservationId, Guid conducteurId)
    {
        await using var tx = await _db.Database.BeginTransactionAsync();

        var reservation = await _reservations.GetByIdAsync(reservationId);
        if (reservation == null) return (false, "Reservation not found.");
        if (reservation.Trajet.ConducteurId != conducteurId) return (false, "Not allowed.");
        if (reservation.Status != ReservationStatus.Pending) return (false, "Only pending reservations can be accepted.");
        if (reservation.Trajet.PlacesDisponibles < reservation.NombrePlaces) return (false, "Not enough available seats.");

        reservation.Trajet.PlacesDisponibles -= reservation.NombrePlaces;
        reservation.Status = ReservationStatus.Accepted;

        if (reservation.Trajet.PlacesDisponibles == 0)
            reservation.Trajet.Status = TrajetStatus.Full;

        await _db.SaveChangesAsync();
        await tx.CommitAsync();

        return (true, "Reservation accepted.");
    }

    public async Task<(bool ok, string message)> RefuseAsync(Guid reservationId, Guid conducteurId)
    {
        var reservation = await _reservations.GetByIdAsync(reservationId);
        if (reservation == null) return (false, "Reservation not found.");
        if (reservation.Trajet.ConducteurId != conducteurId) return (false, "Not allowed.");
        if (reservation.Status != ReservationStatus.Pending) return (false, "Only pending reservations can be refused.");

        reservation.Status = ReservationStatus.Refused;
        await _reservations.SaveAsync();

        return (true, "Reservation refused.");
    }

    public async Task<(bool ok, string message)> CancelAsync(Guid reservationId, Guid userId)
    {
        var reservation = await _reservations.GetByIdAsync(reservationId);
        if (reservation == null) return (false, "Reservation not found.");
        if (reservation.PassagerId != userId) return (false, "Not allowed.");
        if (reservation.Status is ReservationStatus.Cancelled or ReservationStatus.Refused or ReservationStatus.Completed)
            return (false, "Reservation cannot be cancelled.");

        if (reservation.Status == ReservationStatus.Accepted)
        {
            reservation.Trajet.PlacesDisponibles += reservation.NombrePlaces;
            if (reservation.Trajet.Status == TrajetStatus.Full)
                reservation.Trajet.Status = TrajetStatus.Published;
        }

        reservation.Status = ReservationStatus.Cancelled;
        await _reservations.SaveAsync();

        return (true, "Reservation cancelled.");
    }

    public async Task<(bool ok, string message)> CompleteAsync(Guid reservationId, Guid userId)
    {
        var reservation = await _reservations.GetByIdAsync(reservationId);
        if (reservation == null) return (false, "Reservation not found.");
        if (reservation.PassagerId != userId) return (false, "Not allowed.");
        if (reservation.Status != ReservationStatus.Accepted)
            return (false, "Only accepted reservations can be completed.");

        reservation.Status = ReservationStatus.Completed;
        await _reservations.SaveAsync();

        return (true, "Reservation marked as completed.");
    }

    public async Task<List<object>> GetMineAsync(Guid userId)
    {
        return await _reservations.Query()
            .Where(r => r.PassagerId == userId)
            .OrderByDescending(r => r.CreatedAt)
            .Select(r => new
            {
                r.Id,
                r.NombrePlaces,
                r.Status,
                r.CreatedAt,
                Trip = new
                {
                    r.Trajet.Id,
                    r.Trajet.VilleDepart,
                    r.Trajet.VilleDestination,
                    r.Trajet.HeureDepart,
                    DriverName = r.Trajet.Conducteur.Utilisateur.NomComplet
                },
                Companions = r.Companions.Select(c => new
                {
                    c.Id,
                    c.NomComplet,
                    c.Telephone,
                    c.Email
                })
            })
            .Cast<object>()
            .ToListAsync();
    }

    public async Task<List<object>> GetTripReservationsAsync(Guid trajetId, Guid conducteurId)
    {
        return await _reservations.Query()
            .Where(r => r.TrajetId == trajetId && r.Trajet.ConducteurId == conducteurId)
            .OrderBy(r => r.CreatedAt)
            .Select(r => new
            {
                r.Id,
                PassengerName = r.Passager.NomComplet,
                PassengerPhone = r.Passager.Telephone,
                r.NombrePlaces,
                r.Status,
                r.CreatedAt,
                Companions = r.Companions.Select(c => new
                {
                    c.NomComplet,
                    c.Telephone,
                    c.Email
                })
            })
            .Cast<object>()
            .ToListAsync();
    }
}