﻿using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Server.Helpers.Interfaces;
using Server.Models;

namespace Server.Helpers
{
  public class JwtFactory : IJwtFactory
  {
    private readonly JwtIssuerOptions _jwtOptions;

    public JwtFactory(IOptions<JwtIssuerOptions> jwtOptions)
    {
      _jwtOptions = jwtOptions.Value;
      ThrowIfInvalidOptions(_jwtOptions);
    }

    public async Task<string> GenerateEncodedToken(string email, ClaimsIdentity identity)
    {
      var claims = new[]
      {
        new Claim(JwtRegisteredClaimNames.Sub, email),
        new Claim(JwtRegisteredClaimNames.Jti, await _jwtOptions.JtiGenerator()),
        new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(_jwtOptions.IssuedAt).ToString(), ClaimValueTypes.Integer64),
        identity.FindFirst(JwtConstants.Strings.JwtClaimIdentifiers.Rol),
        identity.FindFirst(JwtConstants.Strings.JwtClaimIdentifiers.Id)
      };

      // Create the JWT security token and encode it.
      var jwt = new JwtSecurityToken(
        _jwtOptions.Issuer,
        _jwtOptions.Audience,
        claims,
        _jwtOptions.NotBefore,
        _jwtOptions.Expiration,
        _jwtOptions.SigningCredentials);

      var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

      return encodedJwt;
    }

    public ClaimsIdentity GenerateClaimsIdentity(string email, string id)
    {
      return new ClaimsIdentity(new GenericIdentity(email, "Token"), new[]
      {
        new Claim(JwtConstants.Strings.JwtClaimIdentifiers.Id, id),
        new Claim(JwtConstants.Strings.JwtClaimIdentifiers.Rol, JwtConstants.Strings.JwtClaims.ApiAccess)
      });
    }

    private static long ToUnixEpochDate(DateTime date)
      => (long)Math.Round((date.ToUniversalTime() -
                           new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero))
        .TotalSeconds);

    private static void ThrowIfInvalidOptions(JwtIssuerOptions options)
    {
      if (options == null) throw new ArgumentNullException(nameof(options));

      if (options.ValidFor <= TimeSpan.Zero)
      {
        throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(JwtIssuerOptions.ValidFor));
      }

      if (options.SigningCredentials == null)
      {
        throw new ArgumentNullException(nameof(JwtIssuerOptions.SigningCredentials));
      }

      if (options.JtiGenerator == null)
      {
        throw new ArgumentNullException(nameof(JwtIssuerOptions.JtiGenerator));
      }
    }
  }
}