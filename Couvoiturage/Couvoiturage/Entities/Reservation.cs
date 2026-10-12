namespace Covoiturage.Entities;

public class Reservation
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid TrajetId { get; set; }
    public Trajet Trajet { get; set; } = null!;

    public Guid PassagerId { get; set; }
    public Utilisateur Passager { get; set; } = null!;

    public int NombrePlaces { get; set; } = 1;

    public ReservationStatus Status { get; set; } = ReservationStatus.Pending;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<ReservationCompanion> Companions { get; set; } = new List<ReservationCompanion>();
}