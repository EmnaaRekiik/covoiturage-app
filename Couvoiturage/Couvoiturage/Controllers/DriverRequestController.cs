using System.Security.Claims;
using Covoiturage.DTOs.DriverRequest;
using Covoiturage.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Covoiturage.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DriverRequestsController : ControllerBase
{
    private readonly DriverRequestService _service;

    public DriverRequestsController(DriverRequestService service)
    {
        _service = service;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Submit(CreateDriverRequestDTO dto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");

        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        var result = await _service.SubmitAsync(userId, dto);

        return result.ok
            ? Ok(new { message = result.message, id = result.id })
            : BadRequest(new { message = result.message });
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult Mine()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");

        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        return Ok(_service.GetMyRequests(userId));
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("pending")]
    public IActionResult Pending()
    {
        return Ok(_service.GetAllPending());
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("{id:guid}/approve")]
    public async Task<IActionResult> Approve(Guid id, [FromQuery] string? adminCommentaire)
    {
        var result = await _service.ApproveAsync(id, adminCommentaire);
        return result.ok ? Ok(new { message = result.message }) : BadRequest(new { message = result.message });
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("{id:guid}/reject")]
    public async Task<IActionResult> Reject(Guid id, [FromQuery] string? adminCommentaire)
    {
        var result = await _service.RejectAsync(id, adminCommentaire);
        return result.ok ? Ok(new { message = result.message }) : BadRequest(new { message = result.message });
    }
}