namespace Covoiturage.DTOs.Vehicule;

public class CreateVehiculeDTO
{
    public string Marque { get; set; } = null!;
    public string Modele { get; set; } = null!;
    public string Couleur { get; set; } = null!;
    public string Matricule { get; set; } = null!;
    public int NombrePlaces { get; set; }
    public string? Confort { get; set; }
}