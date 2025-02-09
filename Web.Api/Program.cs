using Web.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddControllers();

builder.Services.AddCors(options => options.AddPolicy("ClientPolicy", conf =>
{
    conf.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddTransient<IRectangleFileService, RectangleFileService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllers();

app.UseCors("ClientPolicy");

app.Run();
