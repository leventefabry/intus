using Microsoft.AspNetCore.Mvc;
using Web.Api.Models;
using Web.Api.Services;

namespace Web.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RectangleController(IRectangleService rectangleService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<Rectangle>> Get(CancellationToken token)
    {
        var rectangle = await rectangleService.GetRectangle(token);
        if (rectangle is null)
        {
            return BadRequest("Error while loading rectangle");
        }
        
        return Ok(rectangle);
    }
    
    [HttpPost]
    public async Task<ActionResult<Rectangle>> Save([FromBody]Rectangle rectangle, CancellationToken token)
    {
        var result = await rectangleService.SaveRectangle(rectangle, token);
        return !result.IsValid ? ValidationProblem(result.ValidationMessage) : NoContent();
    }
}