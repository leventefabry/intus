using Web.Api.Models;

namespace Web.Api.Services;

public interface IRectangleFileService
{
    Task<Rectangle?> LoadRectangleFileAsync(string filename, CancellationToken token = default);
}