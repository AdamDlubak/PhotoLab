using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Helpers;

namespace Server.Controllers
{
    [Produces("application/json")]
    [Route("api/Photo")]
    [AllowAnonymous]
    public class PhotoController : Controller
    {

      private readonly PhotoLabContext _context;

      public PhotoController(PhotoLabContext appDbContext, IHostingEnvironment environment)
      {
        _context = appDbContext;
        _hostingEnvironment = environment;

    }
    private readonly IHostingEnvironment _hostingEnvironment;

    
    [HttpPost("Upload")]
    [EnableCors("CorsDevPolicy")]
    public async Task<IActionResult> Upload(List<IFormFile> files)
      {
        var files2 = Request.Form.Files;
      var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");

        foreach (var file in files2)
        {
        if (file.Length > 0)
        {
          var filePath = Path.Combine(uploads, file.FileName);
          using (var fileStream = new FileStream(filePath, FileMode.Create))
          {
            await file.CopyToAsync(fileStream);
          }
        }
      }
          
        
        return new OkResult();
      }
  }
}