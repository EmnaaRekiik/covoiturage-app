namespace Covoiturage.DTOs.Evaluation;

public class CreateEvaluationDTO
{
    public Guid ToUserId { get; set; }
    public Guid TrajetId { get; set; }
    public int Note { get; set; }
    public string? Commentaire { get; set; }
}