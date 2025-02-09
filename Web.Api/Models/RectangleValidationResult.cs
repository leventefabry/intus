namespace Web.Api.Models;

public record RectangleValidationResult
{
    public bool IsValid { get; private init; }

    public string? ValidationMessage { get; private init; }

    public static RectangleValidationResult Valid()
    {
        return new RectangleValidationResult { IsValid = true };
    }

    public static RectangleValidationResult NotValid(string validationMessage)
    {
        return new RectangleValidationResult { IsValid = false, ValidationMessage = validationMessage };
    }
}