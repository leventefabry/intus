using System.Text.Json;
using Web.Api.Models;

namespace Web.Api.Services;

public class RectangleFileService(ILogger<RectangleFileService> logger) : IRectangleFileService
{
    public async Task<Rectangle?> LoadRectangleFileAsync(string filename, CancellationToken token = default)
    {
        try
        {
            var fileTxt = await File.ReadAllTextAsync(filename, token);
            var rectangle = JsonSerializer.Deserialize<Rectangle>(fileTxt);
            return rectangle;
        }
        catch (FileNotFoundException e)
        {
            logger.LogError(e, "File was not found");
            return null;
        }
        catch (ArgumentNullException e)
        {
            logger.LogError(e, "The JSON value is null");
            return null;
        }
        catch (JsonException e)
        {
            logger.LogError(e, "The JSON value could not be converted to Web.Api.Models.Rectangle");
            return null;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Failed to load rectangle file");
            throw;
        }
    }
}