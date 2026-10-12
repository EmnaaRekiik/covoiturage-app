using Covoiturage.DTOs.Vehicule;
using Covoiturage.Entities;
using Covoiturage.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Covoiturage.Services;

public class VehiculeService
{
    private readonly IVehiculeRepository _vehicules;
    private readonly IUserRepository _users;

    public VehiculeService(IVehiculeRepository vehicules, IUserRepository users)
    {
        _vehicules = vehicules;
        _users = users;
    }

    public async Task<(bool ok, object result)> AddVehiculeAsync(Guid userId, CreateVehiculeDTO dto)
    {
        var user = await _users.GetByIdAsync(userId);
        if (user == null) return (false, "User not found.");
        if (!user.IsDriverApproved) return (false, "Only approved drivers can add vehicles.");

        var vehicule = new Vehicule
        {
            ConducteurId = userId,
            Marque = dto.Marque.Trim(),
            Modele = dto.Modele.Trim(),
            Couleur = dto.Couleur.Trim(),
            Matricule = dto.Matricule.Trim(),
            NombrePlaces = dto.NombrePlaces,
            Confort = dto.Confort,
            IsActive = true
        };

        await _vehicules.AddAsync(vehicule);
        await _vehicules.SaveAsync();

        return (true, vehicule);
    }

    public async Task<List<object>> GetMineAsync(Guid userId)
    {
        return await _vehicules.Query()
            .Where(v => v.ConducteurId == userId)
            .Select(v => new
            {
                v.Id,
                v.Marque,
                v.Modele,
                v.Couleur,
                v.Matricule,
                v.NombrePlaces,
                v.Confort,
                v.IsActive
            })
            .Cast<object>()
            .ToListAsync();
    }

    public async Task<(bool ok, object result)> UpdateVehiculeAsync(Guid userId, Guid vehiculeId, UpdateVehiculeDTO dto)
    {
        var vehicule = await _vehicules.GetByIdAsync(vehiculeId);
        if (vehicule == null) return (false, "Vehicle not found.");

        if (vehicule.ConducteurId != userId) return (false, "You don't own this vehicle.");

        vehicule.Marque = dto.Marque.Trim();
        vehicule.Modele = dto.Modele.Trim();
        vehicule.Couleur = dto.Couleur.Trim();
        vehicule.Matricule = dto.Matricule.Trim();
        vehicule.NombrePlaces = dto.NombrePlaces;
        vehicule.Confort = dto.Confort;

        await _vehicules.SaveAsync();
        return (true, vehicule);
    }

    public async Task<(bool ok, string message)> DeleteVehiculeAsync(Guid userId, Guid vehiculeId)
    {
        var vehicule = await _vehicules.GetByIdAsync(vehiculeId);
        if (vehicule == null) return (false, "Vehicle not found.");

        if (vehicule.ConducteurId != userId) return (false, "You don't own this vehicle.");

        vehicule.IsActive = false;
        await _vehicules.SaveAsync();

        return (true, "Vehicle deleted successfully.");
    }
}