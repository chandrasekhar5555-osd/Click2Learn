using LoggingService;
using Serilog;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .Enrich.WithProperty("Application", "click2learnserver")
    .Enrich.WithProperty("MachineName", Environment.MachineName)
    .Enrich.WithProperty("CurrentManagedThreadId", Environment.CurrentManagedThreadId)
    .Enrich.WithProperty("OSVersion", Environment.OSVersion)
    .Enrich.WithProperty("Version", Environment.Version)
    .Enrich.WithProperty("UserName", Environment.UserName)
    .Enrich.WithProperty("ProcessId", Process.GetCurrentProcess().Id)
    .Enrich.WithProperty("ProcessName", Process.GetCurrentProcess().ProcessName)
    .WriteTo.Console()
    .WriteTo.File(new CustomTextFormatter(), Path.Combine(builder.Environment.ContentRootPath, "Logs", $"click2learn_server_report_{DateTime.Now:yyyyMMdd}.txt"))
    .CreateLogger();

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure logging
app.UseSerilogRequestLogging();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

try
{
    // Intentional division by zero to create an exception
    int zero = 0;
    int result = 100 / zero;
}
catch (Exception ex)
{
    Log.Error(ex, "An error occurred: {ErrorMessage}", ex.Message);
}

app.Run();
