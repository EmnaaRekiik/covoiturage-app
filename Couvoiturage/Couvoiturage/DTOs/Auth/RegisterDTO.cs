namespace Covoiturage.DTOs.Auth;

public class RegisterDTO
{
    public string NomComplet { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Telephone { get; set; } = null!;
    public string Password { get; set; } = null!;
}