using System.Security.Claims;
using Covoiturage.DTOs.Signalement;
using Covoiturage.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Covoiturage.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SignalementsController : ControllerBase
{
    private readonly SignalementService _signalements;

    public SignalementsController(SignalementService signalements)
    {
        _signalements = signalements;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(CreateSignalementDTO dto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");

        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        var result = await _signalements.CreateAsync(userId, dto);

        return result.ok ? Ok(new { message = result.message }) : BadRequest(new { message = result.message });
    }

    [Authorize]
    [HttpGet("mine")]
    public async Task<IActionResult> Mine()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");

        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        return Ok(await _signalements.GetMineAsync(userId));
    }
}