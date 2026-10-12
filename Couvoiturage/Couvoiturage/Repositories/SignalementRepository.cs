using Covoiturage.Data;
using Covoiturage.Entities;
using Covoiturage.Interfaces;

namespace Covoiturage.Repositories;

public class SignalementRepository : ISignalementRepository
{
    private readonly AppDbContext _db;

    public SignalementRepository(AppDbContext db)
    {
        _db = db;
    }

    public IQueryable<Signalement> Query() => _db.Signalements;

    public async Task AddAsync(Signalement signalement)
        => await _db.Signalements.AddAsync(signalement);

    public Task SaveAsync()
        => _db.SaveChangesAsync();
}