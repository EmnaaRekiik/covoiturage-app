using Covoiturage.Entities;

namespace Covoiturage.Interfaces;

public interface IVehiculeRepository
{
    Task<Vehicule?> GetByIdAsync(Guid id);
    IQueryable<Vehicule> Query();
    Task AddAsync(Vehicule vehicule);
    void Remove(Vehicule vehicule);
    Task SaveAsync();
}