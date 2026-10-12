using Covoiturage.Entities;

namespace Covoiturage.Interfaces;

public interface IEvaluationRepository
{
    IQueryable<Evaluation> Query();
    Task AddAsync(Evaluation evaluation);
    Task SaveAsync();
}