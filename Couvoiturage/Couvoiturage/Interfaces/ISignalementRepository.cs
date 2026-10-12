using Covoiturage.Entities;

namespace Covoiturage.Interfaces;

public interface ISignalementRepository
{
    IQueryable<Signalement> Query();
    Task AddAsync(Signalement signalement);
    Task SaveAsync();
}