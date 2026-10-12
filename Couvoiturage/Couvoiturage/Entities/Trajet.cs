namespace Covoiturage.Entities;

public class Trajet
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid ConducteurId { get; set; }
    public Conducteur Conducteur { get; set; } = null!;

    public Guid VehiculeId { get; set; }
    public Vehicule Vehicule { get; set; } = null!;

    public string VilleDepart { get; set; } = null!;
    public string VilleDestination { get; set; } = null!;
    public DateTime HeureDepart { get; set; }

    public decimal Prix { get; set; }
    public int PlacesDisponibles { get; set; }

    public string? Arrets { get; set; }
    public string? Preferences { get; set; }

    public TrajetStatus Status { get; set; } = TrajetStatus.Published;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    public ICollection<Evaluation> Evaluations { get; set; } = new List<Evaluation>();
    public ICollection<Signalement> Signalements { get; set; } = new List<Signalement>();
}