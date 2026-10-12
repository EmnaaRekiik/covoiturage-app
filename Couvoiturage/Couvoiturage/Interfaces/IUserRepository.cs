using Covoiturage.Entities;

namespace Covoiturage.Interfaces;

public interface IUserRepository
{
    Task<Utilisateur?> GetByIdAsync(Guid id);
    Task<Utilisateur?> GetByEmailAsync(string email);
    IQueryable<Utilisateur> Query();
    Task AddAsync(Utilisateur user);
    Task SaveAsync();
}