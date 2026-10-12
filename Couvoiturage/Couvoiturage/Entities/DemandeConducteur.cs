namespace Covoiturage.Entities;

public class DemandeConducteur
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid UtilisateurId { get; set; }
    public Utilisateur Utilisateur { get; set; } = null!;

    public int ExperienceAnnees { get; set; }
    public string NumeroPermis { get; set; } = null!;
    public string CIN { get; set; } = null!;

    public string? JustificatifPermis { get; set; }
    public string? JustificatifVehicule { get; set; }

    public DriverRequestStatus Status { get; set; } = DriverRequestStatus.Pending;
    public string? AdminCommentaire { get; set; }

    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ReviewedAt { get; set; }
}