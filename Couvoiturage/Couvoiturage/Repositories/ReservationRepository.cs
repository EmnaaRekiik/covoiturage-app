using Covoiturage.Data;
using Covoiturage.Entities;
using Covoiturage.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Covoiturage.Repositories;

public class ReservationRepository : IReservationRepository
{
    private readonly AppDbContext _db;

    public ReservationRepository(AppDbContext db)
    {
        _db = db;
    }

    public Task<Reservation?> GetByIdAsync(Guid id)
        => _db.Reservations
            .Include(r => r.Passager)
            .Include(r => r.Trajet).ThenInclude(t => t.Conducteur).ThenInclude(c => c.Utilisateur)
            .Include(r => r.Trajet).ThenInclude(t => t.Vehicule)
            .Include(r => r.Companions)
            .FirstOrDefaultAsync(r => r.Id == id);

    public IQueryable<Reservation> Query()
        => _db.Reservations
            .Include(r => r.Passager)
            .Include(r => r.Trajet).ThenInclude(t => t.Conducteur).ThenInclude(c => c.Utilisateur)
            .Include(r => r.Trajet).ThenInclude(t => t.Vehicule)
            .Include(r => r.Companions);

    public async Task AddAsync(Reservation reservation)
        => await _db.Reservations.AddAsync(reservation);

    public Task SaveAsync()
        => _db.SaveChangesAsync();
}