using Microsoft.AspNetCore.Mvc;
using Web.Api.Models;

namespace Web.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RectangleController : ControllerBase
{
    [HttpGet]
    public ActionResult<Rectangle> Get()
    {
        return Ok(new Rectangle(200, 200, 50, 200));
    }
}