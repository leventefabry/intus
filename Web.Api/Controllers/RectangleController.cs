using Microsoft.AspNetCore.Mvc;
using Web.Api.Models;
using Web.Api.Services;

namespace Web.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RectangleController(IRectangleFileService rectangleFileService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<Rectangle>> Get(CancellationToken token)
    {
        var rectangle = await rectangleFileService.LoadRectangleFileAsync("rectangle.json", token);
        if (rectangle is null)
        {
            return BadRequest("Error while loading rectangle");
        }
        
        return Ok(rectangle);
    }
}