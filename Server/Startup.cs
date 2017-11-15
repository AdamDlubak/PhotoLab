using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
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
      _signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:SecretKey"]));
    }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<PhotoLabContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("ConnectionString")));

      services.AddSingleton<IJwtFactory, JwtFactory>();
      services.AddSingleton<IFileProvider>(new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")));

      var jwtAppSettingOptions = Configuration["JWT:Issuer"];
      // Configure JwtIssuerOptions
      services.Configure<JwtIssuerOptions>(options =>
      {
        options.Issuer = Configuration["JWT:Issuer"];
        options.Audience = Configuration["JWT:Audience"];
        options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
      });

      services.AddAuthorization(options =>
      {
        options.AddPolicy("Admin", policy => policy.RequireClaim(JwtConstants.Strings.JwtClaimIdentifiers.Rol, JwtConstants.Strings.JwtClaims.ApiAccess));
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
            ValidIssuer = Configuration["JWT:Issuer"],

            ValidateAudience = true,
            ValidAudience = Configuration["JWT:Audience"],

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

    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
    {
      loggerFactory.AddConsole();

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      app.UseCors("CorsDevPolicy");
      app.UseDefaultFiles();
      app.UseStaticFiles();
      app.UseAuthentication();
      app.UseMvc();
    }
  }
}
