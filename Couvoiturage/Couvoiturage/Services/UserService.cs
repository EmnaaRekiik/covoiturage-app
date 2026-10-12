using Covoiturage.DTOs.Pagination;
using Covoiturage.DTOs.User;
using Covoiturage.Entities;
using Covoiturage.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Covoiturage.Services;

public class UserService
{
    private readonly IUserRepository _users;
    private readonly ISignalementRepository _signalements;


    public UserService(IUserRepository users, ISignalementRepository signalements)
    {
        _users = users;
        _signalements = signalements;
    }

    public async Task<Utilisateur?> GetByIdAsync(Guid id)
        => await _users.GetByIdAsync(id);

    public async Task<bool> UpdateProfileAsync(Guid userId, UpdateProfileDTO dto)
    {
        var user = await _users.GetByIdAsync(userId);
        if (user == null) return false;

        user.NomComplet = dto.NomComplet.Trim();
        user.Telephone = dto.Telephone.Trim();

        await _users.SaveAsync();
        return true;
    }

    public async Task<bool> BlockUserAsync(Guid userId)
    {
        var user = await _users.GetByIdAsync(userId);
        if (user == null) return false;

        user.IsBlocked = true;
        await _users.SaveAsync();
        return true;
    }

    public async Task<bool> UnblockUserAsync(Guid userId)
    {
        var user = await _users.GetByIdAsync(userId);
        if (user == null) return false;

        user.IsBlocked = false;
        await _users.SaveAsync();
        return true;
    }

    public async Task<PagedResult<object>> GetAllUsersAsync(int page, int pageSize)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 50);

        var query = _users.Query().OrderBy(u => u.NomComplet);

        var totalCount = await query.CountAsync();
        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(u => new
            {
                u.Id,
                u.NomComplet,
                u.Email,
                u.Telephone,
                u.IsAdmin,
                u.IsBlocked,
                u.IsDriverApproved,
                u.CreatedAt
            })
            .Cast<object>()
            .ToListAsync();

        return new PagedResult<object>
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }

    //admin
    public List<object> GetAllReports()
    {
        return _signalements.Query()
            .Select(s => new
            {
                s.Id,
                s.Raison,
                s.CreatedAt,
                Reporter = new
                {
                    s.ReporterUser.Id,
                    s.ReporterUser.NomComplet,
                    s.ReporterUser.Email
                },
                Target = new
                {
                    s.TargetUser.Id,
                    s.TargetUser.NomComplet,
                    s.TargetUser.Email,
                    s.TargetUser.IsBlocked
                },
                s.TrajetId
            })
            .Cast<object>()
            .ToList();
    }

    public async Task<object?> GetDriverStatsAsync(Guid driverId)
    {
        var user = await _users.GetByIdAsync(driverId);
        if (user == null) return null;
        if (!user.IsDriverApproved) return null;

        var trips = _signalements.Query();

        var stats = _users.Query()
            .Where(u => u.Id == driverId)
            .Select(u => new
            {
                u.Id,
                u.NomComplet,
                u.Email,
                u.IsBlocked,
                TotalTrips = u.ConducteurProfil!.Trajets.Count,
                CompletedTrips = u.ConducteurProfil.Trajets
                    .Count(t => t.Status == TrajetStatus.Completed),
                CancelledTrips = u.ConducteurProfil.Trajets
                    .Count(t => t.Status == TrajetStatus.Cancelled),
                TotalReservations = u.ConducteurProfil.Trajets
                    .SelectMany(t => t.Reservations)
                    .Count(r => r.Status == ReservationStatus.Accepted),
                AverageRating = u.EvaluationsRecues.Any()
                    ? u.EvaluationsRecues.Average(e => e.Note)
                    : (double?)null,
                TotalRatings = u.EvaluationsRecues.Count
            })
            .FirstOrDefault();

        return stats;
    }
}