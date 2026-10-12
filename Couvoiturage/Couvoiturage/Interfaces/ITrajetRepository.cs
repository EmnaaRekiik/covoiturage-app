using Covoiturage.Entities;

namespace Covoiturage.Interfaces;

public interface ITrajetRepository
{
    Task<Trajet?> GetByIdAsync(Guid id);
    IQueryable<Trajet> Query();
    Task AddAsync(Trajet trajet);
    void Remove(Trajet trajet);
    Task SaveAsync();
}