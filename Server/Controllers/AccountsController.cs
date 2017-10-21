using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Server.Helpers;

namespace Server.Controllers
{

  [Produces("application/json")]
    [Route("api/Accounts")]
    public class AccountsController : Controller
    {
      private readonly PhotoLabContext _context;
      private readonly UserManager<User> _userManager;
      private readonly IMapper _mapper;

      public AccountsController(UserManager<User> userManager, IMapper mapper, PhotoLabContext appDbContext)
      {
        _userManager = userManager;
        _mapper = mapper;
        _context = appDbContext;
      }

    // POST api/accounts
    [HttpPost]
      public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
      {
        Console.Write("Email: " + model.Email + "\n");
        Console.Write("Password: " + model.Password + "\n");
        Console.Write("FirstName: " + model.FirstName + "\n");
        Console.Write("LastName: " + model.LastName + "\n");
        Console.Write("Level: " + model.Level + "\n\n\n\n\n");
        if (!ModelState.IsValid)
        {
          return BadRequest(ModelState);
        }

        var userIdentity = _mapper.Map<User>(model);
        var result = await _userManager.CreateAsync(userIdentity, model.Password);

        if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

        await _context.AdminUsers.AddAsync(new AdminUser() { IdentityId = userIdentity.Id, Level = model.Level });
        await _context.SaveChangesAsync();

        return new OkResult();
      }
  }
}