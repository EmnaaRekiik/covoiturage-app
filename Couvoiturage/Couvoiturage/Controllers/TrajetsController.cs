using System.Security.Claims;
using Covoiturage.DTOs.Trajet;
using Covoiturage.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Covoiturage.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TrajetsController : ControllerBase
{
    private readonly TrajetService _trajets;

    public TrajetsController(TrajetService trajets)
    {
        _trajets = trajets;
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var trajet = await _trajets.GetByIdAsync(id);
        return trajet == null ? NotFound(new { message = "Trip not found." }) : Ok(trajet);
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchSimple([FromQuery] string from, [FromQuery] string to, [FromQuery] DateTime date)
    {
        return Ok(await _trajets.SearchSimpleAsync(from.Trim(), to.Trim(), date));
    }

    [HttpGet("search/advanced")]
    public async Task<IActionResult> SearchAdvanced(
        [FromQuery] string from,
        [FromQuery] string to,
        [FromQuery] DateTime date,
        [FromQuery] decimal? priceMin,
        [FromQuery] decimal? priceMax,
        [FromQuery] TimeSpan? timeFrom,
        [FromQuery] TimeSpan? timeTo,
        [FromQuery] string? confort,
        [FromQuery] string? preferences,
        [FromQuery] string? arrets)
    {
        return Ok(await _trajets.SearchAdvancedAsync(
            from.Trim(), to.Trim(), date, priceMin, priceMax, timeFrom, timeTo, confort, preferences, arrets));
    }

    [Authorize(Roles = "Conducteur,Admin")]
    [HttpPost]
    public async Task<IActionResult> Create(CreateTrajetDTO dto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");

        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        var result = await _trajets.CreateAsync(userId, dto);

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
        return Ok(await _trajets.GetMineAsync(userId));
    }

    [Authorize(Roles = "Conducteur,Admin")]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateTrajetDTO dto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");
        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        var result = await _trajets.UpdateAsync(userId, id, dto);
        return result.ok ? Ok(result.result) : BadRequest(new { message = result.result });
    }

    [Authorize(Roles = "Conducteur,Admin")]
    [HttpPost("{id:guid}/cancel")]
    public async Task<IActionResult> Cancel(Guid id)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");
        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        var result = await _trajets.CancelAsync(userId, id);
        return result.ok ? NoContent() : BadRequest(new { message = result.message });
    }
}