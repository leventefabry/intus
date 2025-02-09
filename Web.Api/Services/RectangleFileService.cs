using System.Text.Json;
using Web.Api.Models;

namespace Web.Api.Services;

public class RectangleFileService(ILogger<RectangleFileService> logger) : IRectangleFileService
{
    public async Task<Rectangle?> LoadRectangleFromFileAsync(string filename, CancellationToken token = default)
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
            throw;
        }
        catch (ArgumentNullException e)
        {
            logger.LogError(e, "The JSON value is null");
            throw;
        }
        catch (JsonException e)
        {
            logger.LogError(e, "The JSON value could not be converted to Web.Api.Models.Rectangle");
            throw;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Failed to load rectangle file");
            throw;
        }
    }

    public async Task SaveRectangleToFileAsync(string filename, Rectangle rectangle, CancellationToken token = default)
    {
        try
        {
            await File.WriteAllTextAsync(filename, JsonSerializer.Serialize(rectangle), token);
        }
        catch (FileNotFoundException e)
        {
            logger.LogError(e, "File was not found");
            throw;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Failed to save rectangle file");
            throw;
        }
    }
}