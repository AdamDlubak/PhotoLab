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
  }
}