using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Helpers;

namespace Server.Controllers
{
    [Produces("application/json")]
    [Route("api/Photo")]
    public class PhotoController : Controller
    {

      private readonly PhotoLabContext _context;

      public PhotoController(PhotoLabContext appDbContext)
      {
        _context = appDbContext;
      }
      [HttpPost]
      public async Task<IActionResult> Upload(int projectId, int sectionId)
      {


          return new OkObjectResult("File uploaded successfully");


      }
   
  }
}