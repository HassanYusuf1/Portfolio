using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.Data.Repositories;
using Portfolio.API.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// --- Registrer tjenester før "builder.Build()" ---

// Controllers
builder.Services.AddControllers();

// Swagger (API-dokumentasjon)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// SQLite DbContext
builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Repositories
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IContactRepository, ContactRepository>();

// CORS (kun én gang!)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",              // Development frontend URL
                "https://your-production-domain.com"  // Production frontend URL
            )
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// --- Bygg appen (ingen tjenester kan legges til etter dette punktet!) ---
var app = builder.Build();

// --- Konfigurer HTTP-request pipeline ---

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Aktiver CORS (bruk policy definert ovenfor)
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

// --- Database-initialisering ---
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<PortfolioDbContext>();

        // Oppretter databasen og kjører eventuelle migrasjoner automatisk
        context.Database.EnsureCreated();

        // Seed database (fjern kommentar for å aktivere)
        // DbInitializer.Initialize(context);

        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogInformation("Database initialized successfully.");
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while initializing the database.");
    }
}

app.Run();
