namespace Covoiturage.DTOs.DriverRequest;

public class CreateDriverRequestDTO
{
    public int ExperienceAnnees { get; set; }
    public string NumeroPermis { get; set; } = null!;
    public string CIN { get; set; } = null!;
    public string? JustificatifPermis { get; set; }
    public string? JustificatifVehicule { get; set; }
}