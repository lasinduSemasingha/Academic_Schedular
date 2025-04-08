using CoreSystemBackendAPI.Data;
using CoreSystemBackendAPI.Services.Resources;
using CoreSystemBackendAPI.Endpoints.Resources;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddScoped<IResourcesService, ResourcesMain>();
builder.Services.AddSingleton<ApplicationDbContext>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});


var app = builder.Build();

app.UseCors("AllowAllOrigins");

app.MapResourcesEndpoint();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.Run();