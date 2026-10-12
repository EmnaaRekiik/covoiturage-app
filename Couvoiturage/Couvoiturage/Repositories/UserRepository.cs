using Covoiturage.Data;
using Covoiturage.Entities;
using Covoiturage.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Covoiturage.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _db;

    public UserRepository(AppDbContext db)
    {
        _db = db;
    }

    public Task<Utilisateur?> GetByIdAsync(Guid id)
        => _db.Utilisateurs
            .Include(u => u.ConducteurProfil)
            .FirstOrDefaultAsync(u => u.Id == id);

    public Task<Utilisateur?> GetByEmailAsync(string email)
        => _db.Utilisateurs
            .Include(u => u.ConducteurProfil)
            .FirstOrDefaultAsync(u => u.Email == email);

    public IQueryable<Utilisateur> Query()
        => _db.Utilisateurs.Include(u => u.ConducteurProfil);

    public async Task AddAsync(Utilisateur user)
        => await _db.Utilisateurs.AddAsync(user);

    public Task SaveAsync()
        => _db.SaveChangesAsync();
}