using System.Security.Claims;
using Covoiturage.DTOs.Reservation;
using Covoiturage.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Covoiturage.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReservationsController : ControllerBase
{
    private readonly ReservationService _reservations;

    public ReservationsController(ReservationService reservations)
    {
        _reservations = reservations;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(CreateReservationDTO dto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");

        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        var result = await _reservations.CreateAsync(userId, dto);

        return result.ok ? Ok(result.result) : BadRequest(new { message = result.result });
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
        return Ok(await _reservations.GetMineAsync(userId));
    }

    [Authorize(Roles = "Conducteur,Admin")]
    [HttpGet("trip/{trajetId:guid}")]
    public async Task<IActionResult> GetTripReservations(Guid trajetId)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");

        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        return Ok(await _reservations.GetTripReservationsAsync(trajetId, userId));
    }

    [Authorize(Roles = "Conducteur,Admin")]
    [HttpPost("{id:guid}/accept")]
    public async Task<IActionResult> Accept(Guid id)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");

        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        var result = await _reservations.AcceptAsync(id, userId);

        return result.ok ? Ok(new { message = result.message }) : BadRequest(new { message = result.message });
    }

    [Authorize(Roles = "Conducteur,Admin")]
    [HttpPost("{id:guid}/refuse")]
    public async Task<IActionResult> Refuse(Guid id)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");

        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        var result = await _reservations.RefuseAsync(id, userId);

        return result.ok ? Ok(new { message = result.message }) : BadRequest(new { message = result.message });
    }

    [Authorize]
    [HttpPost("{id:guid}/cancel")]
    public async Task<IActionResult> Cancel(Guid id)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");

        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        var result = await _reservations.CancelAsync(id, userId);

        return result.ok ? Ok(new { message = result.message }) : BadRequest(new { message = result.message });
    }

    [Authorize]
    [HttpPost("{id:guid}/complete")]
    public async Task<IActionResult> Complete(Guid id)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");

        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        var result = await _reservations.CompleteAsync(id, userId);

        return result.ok ? Ok(new { message = result.message }) : BadRequest(new { message = result.message });
    }
}