using Covoiturage.DTOs.Evaluation;
using Covoiturage.Entities;
using Covoiturage.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Covoiturage.Services;

public class EvaluationService
{
    private readonly IEvaluationRepository _evaluations;
    private readonly IReservationRepository _reservations;
    private readonly IUserRepository _users;

    public EvaluationService(
        IEvaluationRepository evaluations,
        IReservationRepository reservations,
        IUserRepository users)
    {
        _evaluations = evaluations;
        _reservations = reservations;
        _users = users;
    }

    public async Task<(bool ok, string message)> CreateAsync(Guid fromUserId, CreateEvaluationDTO dto)
    {
        if (dto.Note < 1 || dto.Note > 5) return (false, "Note must be between 1 and 5.");
        if (fromUserId == dto.ToUserId) return (false, "You cannot evaluate yourself.");

        var fromUser = await _users.GetByIdAsync(fromUserId);
        var toUser = await _users.GetByIdAsync(dto.ToUserId);

        if (fromUser == null || toUser == null) return (false, "User not found.");

        var completedReservation = await _reservations.Query()
            .AnyAsync(r =>
                r.TrajetId == dto.TrajetId &&
                r.Status == ReservationStatus.Completed &&
                (
                    (r.PassagerId == fromUserId && r.Trajet.ConducteurId == dto.ToUserId) ||
                    (r.PassagerId == dto.ToUserId && r.Trajet.ConducteurId == fromUserId)
                ));

        if (!completedReservation)
            return (false, "Evaluation is allowed only after a completed shared trip.");

        var alreadyExists = await _evaluations.Query()
            .AnyAsync(e => e.TrajetId == dto.TrajetId && e.FromUserId == fromUserId && e.ToUserId == dto.ToUserId);

        if (alreadyExists)
            return (false, "You have already evaluated this user for this trip.");

        var evaluation = new Evaluation
        {
            FromUserId = fromUserId,
            ToUserId = dto.ToUserId,
            TrajetId = dto.TrajetId,
            Note = dto.Note,
            Commentaire = dto.Commentaire
        };

        await _evaluations.AddAsync(evaluation);
        await _evaluations.SaveAsync();

        return (true, "Evaluation created.");
    }
}