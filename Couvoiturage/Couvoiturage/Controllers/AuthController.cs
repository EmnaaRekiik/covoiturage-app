using Covoiturage.DTOs.Auth;
using Covoiturage.Services;
using Microsoft.AspNetCore.Mvc;

namespace Covoiturage.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _auth;

    public AuthController(AuthService auth)
    {
        _auth = auth;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDTO dto)
    {
        var result = await _auth.RegisterAsync(dto);
        return result.ok ? Ok(new { message = result.message }) : BadRequest(new { message = result.message });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDTO dto)
    {
        var result = await _auth.LoginAsync(dto);
        return result.ok ? Ok(new { token = result.token }) : Unauthorized(new { message = result.message });
    }
}