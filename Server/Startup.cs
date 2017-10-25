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
using Server.Models;
using Server.Helpers;

namespace Server
{
    public class Startup
    {
      private const string SecretKey = "jwts-are-awesome";
      private static readonly string issure = "dotnet_grocery_list";
      private static readonly string audience = "http://localhost:57500/";
    public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
          services.AddDbContext<PhotoLabContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("ConnectionString")));

          var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));

      services.AddIdentity<User, IdentityRole>
            (o =>
            {
              // configure identity options
              o.Password.RequireDigit = false;
              o.Password.RequireLowercase = false;
              o.Password.RequireUppercase = false;
              o.Password.RequireNonAlphanumeric = false;
              o.Password.RequiredLength = 6;
            })
            .AddEntityFrameworkStores<PhotoLabContext>()
            .AddDefaultTokenProviders();


          var key = Encoding.ASCII.GetBytes("Myownsecretcanbeanystring");
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
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
              };
            });



      services.AddMvc().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());

          services.AddAutoMapper();
    }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            
            loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();
          app.UseAuthentication();

      app.UseMvc();
    }
  }
}
