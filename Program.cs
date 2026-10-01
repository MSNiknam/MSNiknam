using System.Globalization;
using Microsoft.AspNetCore.Localization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

builder.Services
    .AddControllersWithViews()
    .AddViewLocalization()
    .AddDataAnnotationsLocalization();

builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    var cultures = new[]
    {
        new CultureInfo("fa-IR"),
        new CultureInfo("en-US")
    };

    options.DefaultRequestCulture = new RequestCulture("fa-IR");
    options.SupportedCultures = cultures;
    options.SupportedUICultures = cultures;

    options.RequestCultureProviders.Insert(0, new CustomRequestCultureProvider(context =>
    {
        var segment = context.Request.Path.Value?
            .Split('/', StringSplitOptions.RemoveEmptyEntries)
            .FirstOrDefault()?
            .ToLowerInvariant();

        var culture = segment switch
        {
            "fa" => "fa-IR",
            "en" => "en-US",
            _ => null
        };

        return Task.FromResult(
            culture is null ? null : new ProviderCultureResult(culture, culture));
    }));
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/fa/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRequestLocalization();
app.UseRouting();
app.UseAuthorization();

app.MapGet("/", () => Results.Redirect("/fa"));

app.MapControllerRoute(
    name: "localized",
    pattern: "{culture:regex(^(fa|en)$)}/{controller=Home}/{action=Index}/{id?}");

app.Run();
