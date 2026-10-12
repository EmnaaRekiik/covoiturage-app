using System.Security.Claims;
using Covoiturage.DTOs.Evaluation;
using Covoiturage.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Covoiturage.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EvaluationsController : ControllerBase
{
    private readonly EvaluationService _evaluations;

    public EvaluationsController(EvaluationService evaluations)
    {
        _evaluations = evaluations;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(CreateEvaluationDTO dto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue("sub");

        if (string.IsNullOrWhiteSpace(userIdClaim))
            return Unauthorized(new { message = "User id claim not found in token." });

        var userId = Guid.Parse(userIdClaim);
        var result = await _evaluations.CreateAsync(userId, dto);

        return result.ok ? Ok(new { message = result.message }) : BadRequest(new { message = result.message });
    }
}