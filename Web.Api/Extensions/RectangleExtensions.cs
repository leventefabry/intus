using Web.Api.Models;

namespace Web.Api.Extensions;

public static class RectangleExtensions
{
    public static bool IsValid(this Rectangle rectangle)
    {
        return rectangle.Width <= rectangle.Height;
    }
}