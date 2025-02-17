using click2learnserver.Data;
using click2learnserver.Models;
using click2learnserver.Services;
using DataService;
using FunctionalService;
using LoggingService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ModelService;
using Serilog;
using System.Diagnostics;
using YourApp.Services;

var builder = WebApplication.CreateBuilder(args);


# region Logger Configuration

// Configure Serilogs with system information
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

builder.Host.UseSerilog();
#endregion

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

#region DB Connection Options

// Configure SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Identity Configuration
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder => builder.WithOrigins("http://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

//For application data interactions
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("click2learn_Dev"), x => x.MigrationsAssembly("click2learnserver"));
});

// For storing and retriving passwords in encrypted format
builder.Services.AddDbContext<DataProtectionKeysContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DataProtectionKeysContext"), x => x.MigrationsAssembly("click2learnserver"));
});

#endregion

// Register services
#region Functional Services
builder.Services.AddHttpClient<IEmailService, EmailService>();
builder.Services.AddScoped<ApplicationDbContext>();
builder.Services.AddScoped<DataProtectionKeysContext>(); // One instace is created for lifetime of application
//builder.Services.AddTransient<IFunctionalSvc, FunctionalSvc>(); // New object instantiated for every request
builder.Services.Configure<AdminUserOptions>(builder.Configuration.GetSection("AdminUserOptions")); // initializing for Functional service dependency injection
builder.Services.Configure<AppUserOptions>(builder.Configuration.GetSection("AppUserOptions"));

#endregion


var app = builder.Build();

// Configure logging
app.UseSerilogRequestLogging();

// Configure the HTTP request pipeline.

app.UseSwagger();

app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors("AllowLocalhost");

app.UseAuthorization();

app.MapControllers();

#region Initialization

//using (var scope = app.Services.CreateScope())
//{
//    var services = scope.ServiceProvider;

//    try
//    {
//        var appcontext = services.GetRequiredService<ApplicationDbContext>();
//        var dpContext = services.GetRequiredService<DataProtectionKeysContext>();
//        var functionSvc = services.GetRequiredService<IFunctionalSvc>();

//        await DbContextInitializer.Initialize(dpContext, appcontext, functionSvc);
//    }
//    catch (Exception ex)
//    {
//        Log.Error("An error occurred while seeding the database: {ErrorMessage}", ex.Message);
//    }
//}

#endregion
app.Run();
