using Nest;
using DotNetEnv;
using OrderNow_Backend.Services.Interfaces;
using OrderNow_Backend.Services.Implementations;

Env.Load();

string? frontendUrl = Environment.GetEnvironmentVariable("FRONTEND_URL");

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        if (frontendUrl != null)
            policy.WithOrigins(frontendUrl)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
    });
});


var elasticConfig = builder.Configuration.GetSection("Elasticsearch");
string? elasticUrl = Environment.GetEnvironmentVariable("ELASTICSEARCH_URL");
var index = elasticConfig["DefaultIndex"];

if (elasticUrl != null)
{
    var settings = new ConnectionSettings(new Uri(elasticUrl))
        .DefaultIndex(index)
        .EnableDebugMode();

    var client = new ElasticClient(settings);

    builder.Services.AddSingleton<IElasticClient>(client);
}

builder.Services.AddScoped<IRestaurantService, ElasticRestaurantService>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseCors("AllowFrontend");


app.UseAuthorization();
app.MapControllers();

app.Run();