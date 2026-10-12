namespace Covoiturage.Entities;

public class Vehicule
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid ConducteurId { get; set; }
    public Conducteur Conducteur { get; set; } = null!;

    public string Marque { get; set; } = null!;
    public string Modele { get; set; } = null!;
    public string Couleur { get; set; } = null!;
    public string Matricule { get; set; } = null!;

    public int NombrePlaces { get; set; }
    public string? Confort { get; set; }
    public bool IsActive { get; set; } = true;

    public ICollection<Trajet> Trajets { get; set; } = new List<Trajet>();
}