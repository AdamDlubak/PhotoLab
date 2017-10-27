using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Server.Helpers;
using Server.Helpers.Interfaces;
using Server.Models;
using Server.ViewModels;

namespace Server.Controllers
{
  [Produces("application/json")]
  [Route("api/Auth")]
  public class AuthController : Controller
  {
    private readonly PhotoLabContext _context;
    private readonly UserManager<User> _userManager;
    private readonly PasswordHasher<User> _passwordHasher;
    private readonly IMapper _mapper;
    private readonly JsonSerializerSettings _serializerSettings;
    private readonly IJwtFactory _jwtFactory;
    private readonly JwtIssuerOptions _jwtOptions;

    public IConfiguration Configuration { get; }
    public AuthController(UserManager<User> userManager, IMapper mapper, PhotoLabContext appDbContext, IConfiguration configuration, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions)
    {
      _userManager = userManager;
      _mapper = mapper;
      _context = appDbContext;
      _jwtFactory = jwtFactory;
      _passwordHasher = new PasswordHasher<User>();
      Configuration = configuration;
      _jwtOptions = jwtOptions.Value;

      _serializerSettings = new JsonSerializerSettings
      {
        Formatting = Formatting.None
      };
    }

    // POST api/auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
    {
      if (!ModelState.IsValid) return BadRequest(ModelState);

      var userIdentity = _mapper.Map<User>(model);
      var result = await _userManager.CreateAsync(userIdentity, model.Password);



      if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));
      await _context.SaveChangesAsync();

      return new OkObjectResult("Account created");
    }


    // Post api/auth/login
    [HttpPost("login")]
    public async Task<IActionResult> Post([FromBody] CredentialsViewModel credentials)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var identity = await GetClaimsIdentity(credentials.Email, credentials.Password);
      if (identity == null)
      {
        return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid email or password.", ModelState));
      }

      // Serialize and return the response
      var response = new
      {
        id = identity.Claims.Single(c => c.Type == "id").Value,
        auth_token = await _jwtFactory.GenerateEncodedToken(credentials.Email, identity),
        expires_in = (int)_jwtOptions.ValidFor.TotalSeconds
      };

      var json = response;
      return new OkObjectResult(json);
    }


    private async Task<ClaimsIdentity> GetClaimsIdentity(string email, string password)
    {
      if (!string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(password))
      {
        // get the user to verifty
        var userToVerify = await _userManager.FindByNameAsync(email);

        if (userToVerify != null)
        {
          // check the credentials  
          if (await _userManager.CheckPasswordAsync(userToVerify, password))
          {
            return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(email, userToVerify.Id));
          }
        }
      }

      // Credentials are invalid, or account doesn't exist
      return await Task.FromResult<ClaimsIdentity>(null);
    }

  }

}