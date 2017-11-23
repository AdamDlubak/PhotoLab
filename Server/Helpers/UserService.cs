using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Helpers
{
    public class UserService 
    {
      private PhotoLabContext _context;
      private readonly UserManager<User> _userManager;


    public UserService(PhotoLabContext context, UserManager<User> userManager)
      {
        _context = context;
        _userManager = userManager;
    }



  }
}