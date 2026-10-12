namespace Covoiturage.DTOs.Reservation;

public class CreateReservationDTO
{
    public Guid TrajetId { get; set; }
    public int NombrePlaces { get; set; } = 1;
    public List<CreateReservationCompanionDTO> Companions { get; set; } = new();
}