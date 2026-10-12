using Covoiturage.Entities;

namespace Covoiturage.Interfaces;

public interface IDriverRequestRepository
{
    Task<DemandeConducteur?> GetByIdAsync(Guid id);
    IQueryable<DemandeConducteur> Query();
    Task AddAsync(DemandeConducteur request);
    Task SaveAsync();
}