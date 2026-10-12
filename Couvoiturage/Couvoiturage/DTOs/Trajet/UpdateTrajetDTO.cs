namespace Covoiturage.DTOs.Trajet;

public class UpdateTrajetDTO
{
    public DateTime? HeureDepart { get; set; }
    public decimal? Prix { get; set; }
    public int? PlacesDisponibles { get; set; }
    public string? Arrets { get; set; }
    public string? Preferences { get; set; }
}