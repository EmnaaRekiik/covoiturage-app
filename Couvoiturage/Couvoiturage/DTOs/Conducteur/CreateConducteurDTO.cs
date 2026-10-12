namespace Covoiturage.DTOs.Conducteur;

public class CreateConducteurDTO
{
    public int ExperienceAnnees { get; set; }
    public string? Preferences { get; set; }
    public string? Confort { get; set; }
}