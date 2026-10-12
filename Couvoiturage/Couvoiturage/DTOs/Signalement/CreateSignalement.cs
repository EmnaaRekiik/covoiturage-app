namespace Covoiturage.DTOs.Signalement;

public class CreateSignalementDTO
{
    public Guid TargetUserId { get; set; }
    public Guid? TrajetId { get; set; }
    public string Raison { get; set; } = null!;
    public string? Description { get; set; }
}