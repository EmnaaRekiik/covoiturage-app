using Covoiturage.Data;
using Covoiturage.DTOs.DriverRequest;
using Covoiturage.Entities;
using Covoiturage.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Covoiturage.Services;

public class DriverRequestService
{
    private readonly IDriverRequestRepository _requests;
    private readonly IUserRepository _users;
    private readonly AppDbContext _db;

    public DriverRequestService(IDriverRequestRepository requests, IUserRepository users, AppDbContext db)
    {
        _requests = requests;
        _users = users;
        _db = db;
    }

    public async Task<(bool ok, string message, Guid? id)> SubmitAsync(Guid userId, CreateDriverRequestDTO dto)
    {
        var user = await _users.GetByIdAsync(userId);
        if (user == null) return (false, "User not found.", null);
        if (user.IsBlocked) return (false, "Blocked user cannot submit a request.", null);
        if (user.IsDriverApproved) return (false, "User is already an approved driver.", null);

        var hasPending = await _requests.Query()
            .AnyAsync(r => r.UtilisateurId == userId && r.Status == DriverRequestStatus.Pending);

        if (hasPending) return (false, "A pending driver request already exists.", null);

        var request = new DemandeConducteur
        {
            UtilisateurId = userId,
            ExperienceAnnees = dto.ExperienceAnnees,
            NumeroPermis = dto.NumeroPermis.Trim(),
            CIN = dto.CIN.Trim(),
            JustificatifPermis = dto.JustificatifPermis,
            JustificatifVehicule = dto.JustificatifVehicule
        };

        await _requests.AddAsync(request);
        await _requests.SaveAsync();

        return (true, "Driver request submitted.", request.Id);
    }

    public List<object> GetMyRequests(Guid userId)
    {
        return _requests.Query()
            .Where(r => r.UtilisateurId == userId)
            .OrderByDescending(r => r.SubmittedAt)
            .Select(r => new
            {
                r.Id,
                r.ExperienceAnnees,
                r.NumeroPermis,
                r.CIN,
                r.Status,
                r.AdminCommentaire,
                r.SubmittedAt,
                r.ReviewedAt
            })
            .Cast<object>()
            .ToList();
    }

    public List<object> GetAllPending()
    {
        return _requests.Query()
            .Where(r => r.Status == DriverRequestStatus.Pending)
            .OrderBy(r => r.SubmittedAt)
            .Select(r => new
            {
                r.Id,
                r.UtilisateurId,
                UserName = r.Utilisateur.NomComplet,
                UserEmail = r.Utilisateur.Email,
                r.ExperienceAnnees,
                r.NumeroPermis,
                r.CIN,
                r.JustificatifPermis,
                r.JustificatifVehicule,
                r.Status,
                r.SubmittedAt
            })
            .Cast<object>()
            .ToList();
    }

    public async Task<(bool ok, string message)> ApproveAsync(Guid requestId, string? adminCommentaire)
    {
        var request = await _requests.GetByIdAsync(requestId);
        if (request == null) return (false, "Request not found.");
        if (request.Status != DriverRequestStatus.Pending) return (false, "Request already reviewed.");

        var user = request.Utilisateur;
        user.IsDriverApproved = true;

        var conducteur = new Conducteur
        {
            Id = user.Id,
            ExperienceAnnees = request.ExperienceAnnees,
            ApprovedAt = DateTime.UtcNow
        };

        request.Status = DriverRequestStatus.Approved;
        request.AdminCommentaire = adminCommentaire;
        request.ReviewedAt = DateTime.UtcNow;

        await _db.Conducteurs.AddAsync(conducteur);
        await _db.SaveChangesAsync();

        return (true, "Driver request approved.");
    }

    public async Task<(bool ok, string message)> RejectAsync(Guid requestId, string? adminCommentaire)
    {
        var request = await _requests.GetByIdAsync(requestId);
        if (request == null) return (false, "Request not found.");
        if (request.Status != DriverRequestStatus.Pending) return (false, "Request already reviewed.");

        request.Status = DriverRequestStatus.Rejected;
        request.AdminCommentaire = adminCommentaire;
        request.ReviewedAt = DateTime.UtcNow;

        await _requests.SaveAsync();
        return (true, "Driver request rejected.");
    }
}