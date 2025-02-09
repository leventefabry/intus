using System.Text.Json.Serialization;

namespace Web.Api.Models;

public record Rectangle
{
    [JsonPropertyName("x")]
    public int X { get; init; }
    
    [JsonPropertyName("y")]
    public int Y { get; init; }
    
    [JsonPropertyName("width")]
    public int Width { get; init; }
    
    [JsonPropertyName("height")]
    public int Height { get; init; }
};