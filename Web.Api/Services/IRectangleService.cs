using Web.Api.Models;

namespace Web.Api.Services;

public interface IRectangleService
{
    Task<Rectangle?> GetRectangle(CancellationToken token = default);
    
    Task<RectangleValidationResult> SaveRectangle(Rectangle rectangle, CancellationToken token = default);
}