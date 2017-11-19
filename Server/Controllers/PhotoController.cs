using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Helpers;
using Server.Models;

namespace Server.Controllers
{
  [Produces("application/json")]
  [Route("api/Photo")]
  [AllowAnonymous]
  public class PhotoController : Controller
  {
    private readonly PhotoLabContext _context;
    private readonly IHostingEnvironment _hostingEnvironment;

    public PhotoController(PhotoLabContext appDbContext, IHostingEnvironment environment)
    {
      _context = appDbContext;
      _hostingEnvironment = environment;

    }

    // GET api/photo/getformats
    [HttpGet("getFormats")]
    public IActionResult GetFormats()
    {
      var formats = _context.Formats.ToList();
      return new OkObjectResult(formats);
    }

    // POST api/photo/saveformat
    [HttpPost("saveFormat")]
    public async Task<IActionResult> SaveFormat([FromBody] Format formatModel)
    {
      string message;
      Format format = _context.Formats.FirstOrDefault(x => x.Id == formatModel.Id);
      if (format == null)
      {
        format = new Format()
        {
          Name = formatModel.Name,
          Width = formatModel.Width,
          Height = formatModel.Height,
          Price = formatModel.Price
        };
        _context.Formats.Add(format);
        message = "Format added!";
      }
      else
      {
        format.Name = formatModel.Name;
        format.Width = formatModel.Width;
        format.Height = formatModel.Height;
        format.Price = formatModel.Price;

        message = "Format edited!";
      }
      await _context.SaveChangesAsync();
      return new OkObjectResult(message);
    }

    // DELETE api/photo/deleteformat
    [HttpDelete("deleteFormat/{id}")]
    public async Task<IActionResult> DeleteFormatById(int id)
    {
      var format = _context.Formats.FirstOrDefault(x => x.Id == id);
      if (format != null)
      {
        _context.Formats.Remove(format);
      }
      await _context.SaveChangesAsync();
      return new OkObjectResult("Format removed!");
    }



    // GET api/photo/getpapers
    [HttpGet("getPapers")]
    public IActionResult GetPapers()
    {
      var papers = _context.Papers.ToList();
      return new OkObjectResult(papers);
    }

    // POST api/photo/savepaper
    [HttpPost("savePaper")]
    public async Task<IActionResult> SavePaper([FromBody] Paper paperModel)
    {
      string message;
      Paper paper = _context.Papers.FirstOrDefault(x => x.Id == paperModel.Id);
      if (paper == null)
      {
        paper = new Paper()
        {
          Name = paperModel.Name
        };
        _context.Papers.Add(paper);
        message = "Paper added!";
      }
      else
      {
        paper.Name = paperModel.Name;

        message = "Paper edited!";
      }
      await _context.SaveChangesAsync();
      return new OkObjectResult(message);
    }

    // DELETE api/photo/deletepaper
    [HttpDelete("deletePaper/{id}")]
    public async Task<IActionResult> DeletePaperById(int id)
    {
      var paper = _context.Papers.FirstOrDefault(x => x.Id == id);
      if (paper != null)
      {
        _context.Papers.Remove(paper);
      }
      await _context.SaveChangesAsync();
      return new OkObjectResult("Paper removed!");
    }



    // GET api/photo/getdefaults
    [HttpGet("getDefaults")]
    public IActionResult GetDefaults()
    {
      var defaults = _context.PrintsParam.Include(def => def.Format).Include(def => def.Paper).Include(def => def.DeliveryType).FirstOrDefault();
      return new OkObjectResult(defaults);
    }
    // POST api/photo/editdefault
    [HttpPost("editDefault")]
    public async Task<IActionResult> EditDefault([FromBody] PrintsParam printsParamModel)
    {
      PrintsParam printsParam = _context.PrintsParam.FirstOrDefault(x => x.Id == printsParamModel.Id);
      if (printsParam != null)
      {
        printsParam.FormatId = printsParamModel.FormatId;
        printsParam.PaperId = printsParamModel.PaperId;
        printsParam.Amount = printsParamModel.Amount;
        printsParam.IsContain = printsParamModel.IsContain;
        printsParam.IsHorizontal = printsParamModel.IsHorizontal;
      }
      await _context.SaveChangesAsync();
      return new OkObjectResult("Default params edited!");
    }


    // GET api/photo/getdeliverytypes
    [HttpGet("getDeliveryTypes")]
    public IActionResult GetDeliveryTypes()
    {
      var deliveryTypes = _context.DeliveryTypes.ToList();
      return new OkObjectResult(deliveryTypes);
    }




    [HttpPost("Upload")]
    [EnableCors("CorsDevPolicy")]
    public async Task<IActionResult> Upload(List<IFormFile> files)
    {
      var files2 = Request.Form.Files;
      StringBuilder s = new StringBuilder();


      foreach (string key in Request.Form.Keys)
      {
        s.AppendLine(key + ": " + Request.Form[key]);
      }
      string formData = s.ToString();
      Console.WriteLine("\t\t\tAdam" + formData);

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