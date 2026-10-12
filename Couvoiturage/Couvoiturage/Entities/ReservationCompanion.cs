namespace Covoiturage.Entities;

public class ReservationCompanion
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid ReservationId { get; set; }
    public Reservation Reservation { get; set; } = null!;

    public string NomComplet { get; set; } = null!;
    public string Telephone { get; set; } = null!;
    public string? Email { get; set; }
}