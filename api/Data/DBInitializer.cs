// Add this after your app building but before app.Run()
// This ensures the database exists and is seeded when the application starts

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<PortfolioDbContext>();
        context.Database.Migrate(); // Applies any pending migrations
        
        // You could call a method here to seed data if needed
        // DbInitializer.Initialize(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while migrating or seeding the database.");
    }
}