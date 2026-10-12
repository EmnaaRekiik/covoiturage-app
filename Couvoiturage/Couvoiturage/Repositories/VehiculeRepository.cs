using Covoiturage.Data;
using Covoiturage.Entities;
using Covoiturage.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Covoiturage.Repositories;

public class VehiculeRepository : IVehiculeRepository
{
    private readonly AppDbContext _db;

    public VehiculeRepository(AppDbContext db)
    {
        _db = db;
    }

    public Task<Vehicule?> GetByIdAsync(Guid id)
        => _db.Vehicules
            .Include(v => v.Conducteur)
            .ThenInclude(c => c.Utilisateur)
            .FirstOrDefaultAsync(v => v.Id == id);

    public IQueryable<Vehicule> Query()
        => _db.Vehicules.Include(v => v.Conducteur).ThenInclude(c => c.Utilisateur);

    public async Task AddAsync(Vehicule vehicule)
        => await _db.Vehicules.AddAsync(vehicule);

    public Task SaveAsync()
        => _db.SaveChangesAsync();

    public void Remove(Vehicule vehicule)
    => _db.Vehicules.Remove(vehicule);
}