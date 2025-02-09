using Web.Api.Models;

namespace Web.Api.Services;

public interface IRectangleFileService
{
    Task<Rectangle?> LoadRectangleFromFileAsync(string filename, CancellationToken token = default);

    Task SaveRectangleToFileAsync(string filename, Rectangle rectangle, CancellationToken token = default);
}