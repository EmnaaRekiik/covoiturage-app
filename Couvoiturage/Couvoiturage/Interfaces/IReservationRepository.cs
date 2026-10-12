using Covoiturage.Entities;

namespace Covoiturage.Interfaces;

public interface IReservationRepository
{
    Task<Reservation?> GetByIdAsync(Guid id);
    IQueryable<Reservation> Query();
    Task AddAsync(Reservation reservation);
    Task SaveAsync();
}