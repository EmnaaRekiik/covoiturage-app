namespace Covoiturage.Entities;

public class Utilisateur
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string NomComplet { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Telephone { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;

    public bool IsAdmin { get; set; } = false;
    public bool IsBlocked { get; set; } = false;
    public bool IsDriverApproved { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Conducteur? ConducteurProfil { get; set; }

    public ICollection<DemandeConducteur> DemandesConducteur { get; set; } = new List<DemandeConducteur>();
    public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();

    public ICollection<Evaluation> EvaluationsDonnees { get; set; } = new List<Evaluation>();
    public ICollection<Evaluation> EvaluationsRecues { get; set; } = new List<Evaluation>();

    public ICollection<Signalement> SignalementsEnvoyes { get; set; } = new List<Signalement>();
    public ICollection<Signalement> SignalementsRecus { get; set; } = new List<Signalement>();
}