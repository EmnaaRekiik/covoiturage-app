using Covoiturage.Data;
using Covoiturage.Entities;
using Covoiturage.Interfaces;

namespace Covoiturage.Repositories;

public class EvaluationRepository : IEvaluationRepository
{
    private readonly AppDbContext _db;

    public EvaluationRepository(AppDbContext db)
    {
        _db = db;
    }

    public IQueryable<Evaluation> Query() => _db.Evaluations;

    public async Task AddAsync(Evaluation evaluation)
        => await _db.Evaluations.AddAsync(evaluation);

    public Task SaveAsync()
        => _db.SaveChangesAsync();
}