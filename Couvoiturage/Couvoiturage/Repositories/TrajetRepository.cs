using Covoiturage.Data;
using Covoiturage.Entities;
using Covoiturage.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Covoiturage.Repositories;

public class TrajetRepository : ITrajetRepository
{
    private readonly AppDbContext _db;

    public TrajetRepository(AppDbContext db)
    {
        _db = db;
    }

    public Task<Trajet?> GetByIdAsync(Guid id)
        => _db.Trajets
            .Include(t => t.Conducteur).ThenInclude(c => c.Utilisateur)
            .Include(t => t.Vehicule)
            .FirstOrDefaultAsync(t => t.Id == id);

    public IQueryable<Trajet> Query()
        => _db.Trajets
            .Include(t => t.Conducteur).ThenInclude(c => c.Utilisateur)
            .Include(t => t.Vehicule);

    public async Task AddAsync(Trajet trajet)
        => await _db.Trajets.AddAsync(trajet);

    public Task SaveAsync()
        => _db.SaveChangesAsync();

    public void Remove(Trajet trajet)
    => _db.Trajets.Remove(trajet);
}