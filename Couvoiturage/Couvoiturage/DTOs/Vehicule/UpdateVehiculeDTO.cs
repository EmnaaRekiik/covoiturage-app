using System.ComponentModel.DataAnnotations;

namespace Covoiturage.DTOs.Vehicule;

public class UpdateVehiculeDTO
{
    [Required]
    public string Marque { get; set; } = null!;

    [Required]
    public string Modele { get; set; } = null!;

    [Required]
    public string Couleur { get; set; } = null!;

    [Required]
    public string Matricule { get; set; } = null!;

    [Range(1, 9)]
    public int NombrePlaces { get; set; }

    public string? Confort { get; set; }
}