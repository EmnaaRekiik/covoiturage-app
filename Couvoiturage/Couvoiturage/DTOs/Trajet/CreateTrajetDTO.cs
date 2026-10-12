namespace Covoiturage.DTOs.Trajet;

public class CreateTrajetDTO
{
    public Guid VehiculeId { get; set; }

    public string VilleDepart { get; set; } = null!;
    public string VilleDestination { get; set; } = null!;
    public DateTime HeureDepart { get; set; }

    public decimal Prix { get; set; }
    public int PlacesDisponibles { get; set; }

    public string? Arrets { get; set; }
    public string? Preferences { get; set; }
}