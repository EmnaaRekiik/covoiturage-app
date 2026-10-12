namespace Covoiturage.DTOs.Reservation;

public class CreateReservationCompanionDTO
{
    public string NomComplet { get; set; } = null!;
    public string Telephone { get; set; } = null!;
    public string? Email { get; set; }
}