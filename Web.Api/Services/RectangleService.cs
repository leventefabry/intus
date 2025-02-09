using Web.Api.Extensions;
using Web.Api.Models;

namespace Web.Api.Services;

public class RectangleService(
    IRectangleFileService rectangleFileService,
    ILogger<RectangleService> logger) : IRectangleService
{
    private const string RectangleFileName = "rectangle.json";
    
    public async Task<Rectangle?> GetRectangle(CancellationToken token = default)
    {
        try
        {
            var rectangle = await rectangleFileService.LoadRectangleFromFileAsync(RectangleFileName, token);
            return rectangle;
        }
        catch (Exception e)
        {
            logger.LogError(e, "An error occurred while loading the json file");

            // an error happened return default rectangle
            return new Rectangle
            {
                X = 10,
                Y = 10,
                Width = 50,
                Height = 100,
            };
        }
    }

    public async Task<RectangleValidationResult> SaveRectangle(Rectangle rectangle, CancellationToken token = default)
    {
        try
        {
            await Task.Delay(TimeSpan.FromSeconds(10), token);
            if (!rectangle.IsValid())
            {
                return RectangleValidationResult.NotValid("The width can't exceed the height");
            }

            await rectangleFileService.SaveRectangleToFileAsync(RectangleFileName, rectangle, token);
            return RectangleValidationResult.Valid();
        }
        catch (Exception e)
        {
            logger.LogError(e, "An error occurred while saving the json file");
            throw;
        }
    }
}