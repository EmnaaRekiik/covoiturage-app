namespace Covoiturage.Entities;

public class Conducteur
{
    public Guid Id { get; set; } // same as Utilisateur.Id

    public Utilisateur Utilisateur { get; set; } = null!;

    public int ExperienceAnnees { get; set; }
    public DateTime ApprovedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Vehicule> Vehicules { get; set; } = new List<Vehicule>();
    public ICollection<Trajet> Trajets { get; set; } = new List<Trajet>();
}