namespace Covoiturage.Entities;

public class Evaluation
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid FromUserId { get; set; }
    public Utilisateur FromUser { get; set; } = null!;

    public Guid ToUserId { get; set; }
    public Utilisateur ToUser { get; set; } = null!;

    public Guid TrajetId { get; set; }
    public Trajet Trajet { get; set; } = null!;

    public int Note { get; set; }
    public string? Commentaire { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}