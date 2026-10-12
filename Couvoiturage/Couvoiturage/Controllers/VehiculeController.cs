using System.Security.Claims;
using Covoiturage.DTOs.Vehicule;
using Covoiturage.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Covoiturage.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VehiculeController : ControllerBase
{
    private readonly VehiculeService _vehicules;

    public VehiculeController(VehiculeService vehicules)
    {
        _vehicules = vehicules;
    }

    [Authorize(Roles = "Conducteur,Admin")]
    [HttpPost]
    public async Task<IActionResult> Add(CreateVehiculeDTO dto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");

        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim); var result = await _vehicules.AddVehiculeAsync(userId, dto);

        return result.ok ? Ok(result.result) : BadRequest(new { message = result.result });
    }

    [Authorize(Roles = "Conducteur,Admin")]
    [HttpGet("mine")]
    public async Task<IActionResult> Mine()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");

        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        return Ok(await _vehicules.GetMineAsync(userId));
    }

    [Authorize(Roles = "Conducteur,Admin")]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateVehiculeDTO dto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");
        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        var result = await _vehicules.UpdateVehiculeAsync(userId, id, dto);
        return result.ok ? Ok(result.result) : BadRequest(new { message = result.result });
    }

    [Authorize(Roles = "Conducteur,Admin")]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");
        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        var result = await _vehicules.DeleteVehiculeAsync(userId, id);
        return result.ok ? NoContent() : BadRequest(new { message = result.message });
    }
}