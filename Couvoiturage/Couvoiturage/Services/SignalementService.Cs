using Covoiturage.DTOs.Signalement;
using Covoiturage.Entities;
using Covoiturage.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Covoiturage.Services;

public class SignalementService
{
    private readonly ISignalementRepository _signalements;
    private readonly IUserRepository _users;

    public SignalementService(ISignalementRepository signalements, IUserRepository users)
    {
        _signalements = signalements;
        _users = users;
    }

    public async Task<(bool ok, string message)> CreateAsync(Guid reporterId, CreateSignalementDTO dto)
    {
        if (reporterId == dto.TargetUserId) return (false, "You cannot report yourself.");

        var reporter = await _users.GetByIdAsync(reporterId);
        var target = await _users.GetByIdAsync(dto.TargetUserId);

        if (reporter == null || target == null) return (false, "User not found.");

        var signalement = new Signalement
        {
            ReporterUserId = reporterId,
            TargetUserId = dto.TargetUserId,
            TrajetId = dto.TrajetId,
            Raison = dto.Raison.Trim(),
            Description = dto.Description
        };

        await _signalements.AddAsync(signalement);
        await _signalements.SaveAsync();

        var count = await _signalements.Query()
            .CountAsync(s => s.TargetUserId == dto.TargetUserId);

        if (count >= 3)
        {
            target.IsBlocked = true;
            await _users.SaveAsync();
        }

        return (true, "Report submitted.");
    }

    public async Task<List<object>> GetMineAsync(Guid userId)
    {
        return await _signalements.Query()
            .Where(s => s.ReporterUserId == userId)
            .OrderByDescending(s => s.CreatedAt)
            .Select(s => new
            {
                s.Id,
                s.TargetUserId,
                s.TrajetId,
                s.Raison,
                s.Description,
                s.Status,
                s.CreatedAt
            })
            .Cast<object>()
            .ToListAsync();
    }
}