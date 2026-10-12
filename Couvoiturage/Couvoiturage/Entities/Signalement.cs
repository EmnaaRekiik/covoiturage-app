namespace Covoiturage.Entities;

public class Signalement
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid ReporterUserId { get; set; }
    public Utilisateur ReporterUser { get; set; } = null!;

    public Guid TargetUserId { get; set; }
    public Utilisateur TargetUser { get; set; } = null!;

    public Guid? TrajetId { get; set; }
    public Trajet? Trajet { get; set; }

    public string Raison { get; set; } = null!;
    public string? Description { get; set; }

    public ReportStatus Status { get; set; } = ReportStatus.Pending;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}