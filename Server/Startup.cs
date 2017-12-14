using System;
using System.Globalization;
using System.IO;
using System.Security.Claims;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;
using Server.Models;
using Server.Helpers;
using Server.Helpers.Interfaces;

namespace Server
{
  public class Startup
  {
    private readonly SymmetricSecurityKey _signingKey;

    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration, IHostingEnvironment env)
    {
      var builder = new ConfigurationBuilder()
        .SetBasePath(env.ContentRootPath)
        .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

      if (env.IsDevelopment())
      {
        builder.AddUserSecrets<Startup>();
      }

      Configuration = builder.Build();
      _signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("jwts-are_awesomeAs1ThinkS0"));
    }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<PhotoLabContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("ConnectionString")));

      services.AddSingleton<IJwtFactory, JwtFactory>();
      services.AddSingleton<IFileProvider>(new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")));

      // Configure JwtIssuerOptions
      services.Configure<JwtIssuerOptions>(options =>
      {
        options.Issuer = "SecretT0k3NforI$$u3R";
        options.Audience = Configuration["JWT:Audience"];
        options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
      });

      services.AddAuthorization(options =>
      {
        options.AddPolicy("Admin", policy => policy.RequireClaim(JwtConstants.Strings.JwtClaimIdentifiers.RolAdmin, JwtConstants.Strings.JwtClaims.Admin));
        options.AddPolicy("User", policy => policy.RequireClaim(JwtConstants.Strings.JwtClaimIdentifiers.RolUser, JwtConstants.Strings.JwtClaims.User));
      });

      services.AddIdentity<User, IdentityRole>
            (o =>
            {
              o.Password.RequireDigit = false;
              o.Password.RequireLowercase = false;
              o.Password.RequireUppercase = false;
              o.Password.RequireNonAlphanumeric = false;
              o.Password.RequiredLength = 6;
            })
            .AddEntityFrameworkStores<PhotoLabContext>()
            .AddDefaultTokenProviders();



      services.AddAuthentication(x =>
        {
          x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
          x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(x =>
        {
          x.RequireHttpsMetadata = false;
          x.SaveToken = true;

          x.TokenValidationParameters = new TokenValidationParameters
          {
            
            ValidateIssuer = true,
            ValidIssuer = "SecretT0k3NforI$$u3R",

            ValidateAudience = true,
            ValidAudience = "http://localhost:57500/",

            ValidateIssuerSigningKey = true,
            IssuerSigningKey = _signingKey,

            RequireExpirationTime = false,
            ValidateLifetime = false,

            ClockSkew = TimeSpan.Zero
          };
        });


      services.AddCors(options =>
      {
        options.AddPolicy("CorsDevPolicy", builder =>
        {
          builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
        });
      });
      services.AddMvc().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>())
        .AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore); ;
      services.AddAutoMapper();
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IServiceProvider serviceProvider)
    {
      loggerFactory.AddConsole();

      SetupRoles(serviceProvider).Wait();
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      app.UseCors("CorsDevPolicy");
      app.UseDefaultFiles();
      app.UseStaticFiles();
      app.UseAuthentication();
      app.UseMvc(routes =>
      {
        routes.MapRoute(
          name: "default",
          template: "{controller=Home}/{action=Index}/{id?}");
        routes.MapSpaFallbackRoute(
          name: "spa-fallback",
          defaults: new { controller = "Home", action = "Index" });
      });
    }

    public async Task<IActionResult> SetupRoles(IServiceProvider serviceProvider)
    {
      var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
      var adminRole = await roleManager.FindByNameAsync("Admin");
      if (adminRole == null)
      {
        adminRole = new IdentityRole("Admin");
        await roleManager.CreateAsync(adminRole);

        await roleManager.AddClaimAsync(adminRole, new Claim(JwtConstants.Strings.JwtClaimIdentifiers.RolAdmin, JwtConstants.Strings.JwtClaims.Admin));
      }


      var accountManagerRole = await roleManager.FindByNameAsync("User");

      if (accountManagerRole == null)
      {
        accountManagerRole = new IdentityRole("User");
        await roleManager.CreateAsync(accountManagerRole);

        await roleManager.AddClaimAsync(accountManagerRole, new Claim(JwtConstants.Strings.JwtClaimIdentifiers.RolUser, JwtConstants.Strings.JwtClaims.User));
      }
      return new OkResult();
    }
  }
}
