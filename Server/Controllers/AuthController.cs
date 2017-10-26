using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.Helpers;
using Server.Models;
using Server.ViewModels;

namespace Server.Controllers
{
    [Produces("application/json")]
    [Route("api/Auth")]
    public class AuthController : Controller
    {
      private const string SecretKey = "jwts-are-awesome";


    private readonly PhotoLabContext _context;
      private readonly UserManager<User> _userManager;
      private readonly PasswordHasher<User> _passwordHasher;
      private readonly IMapper _mapper;
    public AuthController(UserManager<User> userManager, IMapper mapper, PhotoLabContext appDbContext)
      {
        _userManager = userManager;
        _mapper = mapper;
        _context = appDbContext;
        _passwordHasher = new PasswordHasher<User>();
      }

      // POST api/auth/register
      [HttpPost("register")]
      public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
      {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var userIdentity = _mapper.Map<User>(model);
        var result = await _userManager.CreateAsync(userIdentity, model.Password);



        if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

        await _context.AdminUsers.AddAsync(new AdminUser() { IdentityId = userIdentity.Id, Level = model.Level });
        await _context.SaveChangesAsync();

        return new OkResult();
      }


    // Post api/auth/login
    [HttpPost("login")]
      public async Task<IActionResult> Post([FromBody] CredentialsViewModel credentials)
      {
        if (!ModelState.IsValid)
        {
          return BadRequest(ModelState);
        }

        var user = await _userManager.FindByNameAsync(credentials.UserName);

        if (user == null || _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, credentials.Password) != PasswordVerificationResult.Success)
        {
          return BadRequest();
        }


      var token = CreateJWTToken(user);

        return Ok(new
        {
          token = new JwtSecurityTokenHandler().WriteToken(token),
        });
      }

    private JwtSecurityToken CreateJWTToken(User user)
    {
      var key = Encoding.ASCII.GetBytes("Myownsecretcanbeanystring");
      return new JwtSecurityToken(
        claims: GetTokenClaims(user),
        expires: DateTime.UtcNow.AddMinutes(15),
        signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      );
      }
      private IEnumerable<Claim> GetTokenClaims(User user)
      {
        return new List<Claim>
        {
          new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
          new Claim(JwtRegisteredClaimNames.Email, user.Email),
          new Claim(JwtRegisteredClaimNames.NameId, user.Id)
        };
      }

    
  }

}