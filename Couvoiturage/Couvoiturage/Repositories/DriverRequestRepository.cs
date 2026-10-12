using Covoiturage.Data;
using Covoiturage.Entities;
using Covoiturage.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Covoiturage.Repositories;

public class DriverRequestRepository : IDriverRequestRepository
{
    private readonly AppDbContext _db;

    public DriverRequestRepository(AppDbContext db)
    {
        _db = db;
    }

    public Task<DemandeConducteur?> GetByIdAsync(Guid id)
        => _db.DemandesConducteur
            .Include(d => d.Utilisateur)
            .FirstOrDefaultAsync(d => d.Id == id);

    public IQueryable<DemandeConducteur> Query()
        => _db.DemandesConducteur.Include(d => d.Utilisateur);

    public async Task AddAsync(DemandeConducteur request)
        => await _db.DemandesConducteur.AddAsync(request);

    public Task SaveAsync()
        => _db.SaveChangesAsync();
}