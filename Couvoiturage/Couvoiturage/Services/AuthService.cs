using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Covoiturage.DTOs.Auth;
using Covoiturage.Entities;
using Covoiturage.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Covoiturage.Services;

public class AuthService
{
    private readonly IUserRepository _users;
    private readonly IConfiguration _config;
    private readonly PasswordHasher<Utilisateur> _hasher = new();

    public AuthService(IUserRepository users, IConfiguration config)
    {
        _users = users;
        _config = config;
    }

    public async Task<(bool ok, string message)> RegisterAsync(RegisterDTO dto)
    {
        var email = dto.Email.Trim().ToLower();

        var exists = await _users.GetByEmailAsync(email);
        if (exists != null) return (false, "Email already used.");

        var user = new Utilisateur
        {
            NomComplet = dto.NomComplet.Trim(),
            Email = email,
            Telephone = dto.Telephone.Trim(),
            IsAdmin = false,
            IsBlocked = false,
            IsDriverApproved = false
        };

        user.PasswordHash = _hasher.HashPassword(user, dto.Password);

        await _users.AddAsync(user);
        await _users.SaveAsync();

        return (true, "Registered successfully.");
    }

    public async Task<(bool ok, string token, string message)> LoginAsync(LoginDTO dto)
    {
        var user = await _users.GetByEmailAsync(dto.Email.Trim().ToLower());

        if (user == null) return (false, "", "Invalid credentials.");
        if (user.IsBlocked) return (false, "", "Account blocked.");

        var result = _hasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
        if (result == PasswordVerificationResult.Failed)
            return (false, "", "Invalid credentials.");

        var token = GenerateJwt(user);
        return (true, token, "Login successful.");
    }

    private string GenerateJwt(Utilisateur user)
    {
        var jwt = _config.GetSection("Jwt");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new("sub", user.Id.ToString()),
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email),
            new("isAdmin", user.IsAdmin.ToString()),
            new("isDriverApproved", user.IsDriverApproved.ToString())
        };
        if (user.IsAdmin)
            claims.Add(new Claim(ClaimTypes.Role, "Admin"));

        if (user.IsDriverApproved)
            claims.Add(new Claim(ClaimTypes.Role, "Conducteur"));

        claims.Add(new Claim(ClaimTypes.Role, "Passager"));

        var token = new JwtSecurityToken(
            issuer: jwt["Issuer"],
            audience: jwt["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}