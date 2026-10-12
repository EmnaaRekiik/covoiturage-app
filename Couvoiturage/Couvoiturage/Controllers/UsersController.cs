using System.Security.Claims;
using Covoiturage.DTOs.User;
using Covoiturage.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Covoiturage.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserService _users;

    public UsersController(UserService users)
    {
        _users = users;
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetMe()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");

        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        var user = await _users.GetByIdAsync(userId);

        if (user == null) return NotFound(new { message = "User not found." });

        return Ok(new
        {
            user.Id,
            user.NomComplet,
            user.Email,
            user.Telephone,
            user.IsAdmin,
            user.IsBlocked,
            user.IsDriverApproved,
            HasDriverProfile = user.ConducteurProfil != null
        });
    }

    [Authorize]
    [HttpPut("me")]
    public async Task<IActionResult> UpdateMe(UpdateProfileDTO dto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");

        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim); 
        var ok = await _users.UpdateProfileAsync(userId, dto);

        return ok ? Ok(new { message = "Profile updated." }) : NotFound(new { message = "User not found." });
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        return Ok(await _users.GetAllUsersAsync(page, pageSize));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("{id:guid}/block")]
    public async Task<IActionResult> Block(Guid id)
    {
        var ok = await _users.BlockUserAsync(id);
        return ok ? Ok(new { message = "User blocked." }) : NotFound(new { message = "User not found." });
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("{id:guid}/unblock")]
    public async Task<IActionResult> Unblock(Guid id)
    {
        var ok = await _users.UnblockUserAsync(id);
        return ok ? Ok(new { message = "User unblocked." }) : NotFound(new { message = "User not found." });
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("reports")]
    public IActionResult GetAllReports()
    {
        return Ok(_users.GetAllReports());
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("{id:guid}/stats")]
    public async Task<IActionResult> GetDriverStats(Guid id)
    {
        var stats = await _users.GetDriverStatsAsync(id);
        return stats == null
            ? NotFound(new { message = "Driver not found or user is not an approved driver." })
            : Ok(stats);
    }
}