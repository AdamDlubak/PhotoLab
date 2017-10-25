using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{

  [Produces("application/json")]
    [Route("api/Dashboard")]
    public class DashboardController : Controller
    {
    [Authorize]
    [HttpGet]
    public IActionResult Get()
    {
      Console.WriteLine("Protected datas");
      return new OkResult();

    }
  }
}