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
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Helpers;
using Server.Models;
using Server.ViewModels;

namespace Server.Controllers
{
  [Produces("application/json")]
  [Route("api/Photo")]
  [AllowAnonymous]
  public class PhotoController : Controller
  {
    private readonly PhotoLabContext _context;
    private readonly IHostingEnvironment _hostingEnvironment;
    private readonly UserManager<Models.User> _userManager;

    public PhotoController(PhotoLabContext appDbContext, IHostingEnvironment environment, UserManager<Models.User> userManager)
    {
      _context = appDbContext;
      _hostingEnvironment = environment;
      _userManager = userManager;
    }
    // POST api/photo/setOrderStatus/id
    [HttpPost("setorderstatus/{id}")]
    public async Task<IActionResult> SetOrderStatus([FromBody] int statusId, int id)
    {
      if (!ModelState.IsValid) return BadRequest(ModelState);
      var order = _context.Orders.FirstOrDefault(x => x.Id == id);

      order.Status = statusId;
      await _context.SaveChangesAsync();

      return new OkResult();
    }
    // POST api/photo/setOrderNewStatus/id
    [HttpPost("setordernewstatus/{id}")]
    public async Task<IActionResult> SetOrderNewStatus([FromBody] bool newStatus, int id)
    {
      if (!ModelState.IsValid) return BadRequest(ModelState);
      var order = _context.Orders.FirstOrDefault(x => x.Id == id);

      order.IsNew = newStatus;
      await _context.SaveChangesAsync();

      return new OkResult();
    }
    // POST api/photo/submitOrderDate/id
    [HttpPost("submitOrderDate/{id}")]
    public async Task<IActionResult> SubmitOrderDate([FromBody] DateViewModel dateViewModel, int id)
    {
      if (!ModelState.IsValid) return BadRequest(ModelState);
      if (dateViewModel.DateTime != null)
      {
        TimeSpan ts = new TimeSpan(1, 0, 0);
        dateViewModel.DateTime = dateViewModel.DateTime.Value + ts;
      }

      var order = _context.Orders.FirstOrDefault(x => x.Id == id);
        switch (dateViewModel.DateType)
        {
          case 0:
            order.OrderDate = dateViewModel.DateTime;
            break;
          case 1:
            order.PaymentDate = dateViewModel.DateTime;
            break;
          case 2:
            order.ShippingDate = dateViewModel.DateTime;
            break;
          case 3:
            order.EndDate = dateViewModel.DateTime;
            break;
          default:
            return BadRequest("Wrong date type!");
        }
    
      await _context.SaveChangesAsync();

      return new OkResult();
    }
    // POST api/photo/submitOrder
    [HttpPost("submitOrder")]
    public async Task<IActionResult> SubmitOrder([FromBody] OrderViewModel orderViewModel)
     {
      if (!ModelState.IsValid) return BadRequest(ModelState);

       if (orderViewModel.DeliveryDataId == null && orderViewModel.DeliveryTypeId != 1)
       {
         _context.DeliveryDatas.Add(orderViewModel.DeliveryData);
         _context.SaveChanges();
         orderViewModel.DeliveryDataId = orderViewModel.DeliveryData.Id;
         orderViewModel.DeliveryData = null;
       }
       if (orderViewModel.InvoiceDataId == null && orderViewModel.IsInvoice)
       {
         _context.InvoiceDatas.Add(orderViewModel.InvoiceData);
         _context.SaveChanges();
         orderViewModel.InvoiceDataId = orderViewModel.InvoiceData.Id;
         orderViewModel.InvoiceData = null;
      }
      var order = Mapper.Map<Order>(orderViewModel);
       order.PaymentStatusId = 1;
      foreach (var photo in order.Photos)
      {
        _context.Photos.Add(photo);
      }
      _context.Orders.Add(order);

       var client = await _userManager.Users.Where(e => e.Id == orderViewModel.UserId).FirstOrDefaultAsync();
       client.OrdersAmount = client.OrdersAmount + 1;
      await _context.SaveChangesAsync();

      return new OkObjectResult("Order added correctly!");
    }
    // GET api/photo/getnewordersamount
    [HttpGet("getNewOrdersAmount")]
    public IActionResult GetNewOrdersAmount()
    {
      var ordersAmt = _context.Orders.Count(x => x.IsNew);
      return new OkObjectResult(ordersAmt);
    }
    // GET api/photo/getorder/id
    [HttpGet("getOrder/{id}")]
    public IActionResult GetOrder(int id)
    {
      var orders = _context.Orders.Include(x => x.Photos).ThenInclude(y => y.Prints).Include(p => p.DeliveryData).Include(c => c.User).Include(i => i.InvoiceData).Include(p => p.PaymentStatus).Include(pt => pt.PaymentType).FirstOrDefault(o => o.Id == id);
      return new OkObjectResult(orders);
    }
    // GET api/photo/getorders
    [HttpGet("getOrders")]
    public IActionResult GetOrders()
    {
      
      List<Order> ordersList = _context.Orders.Include(x => x.Photos).ThenInclude(y => y.Prints).Include(p => p.DeliveryData).Include(c => c.User).ToList();
      List<OrdersViewModel> ordersViewModelList = new List<OrdersViewModel>();

      foreach (var order in ordersList)
      {
        bool delivery;
        if (order.DeliveryDataId == 0) delivery = false;
        else delivery = true;
        ordersViewModelList.Add(new OrdersViewModel()
        {
          Id = order.Id,
          UserName = order.User.FirstName + " "+ order.User.LastName,
          OrderDate = order.OrderDate,
          PrintsAmt = order.TotalPrints,
          TotalOrderPrice = order.TotalOrderPrice,
          Delivery = delivery,
          Bill = order.IsInvoice,
          Status = order.Status,
          IsNew = order.IsNew
        });
      }
      return new OkObjectResult(ordersViewModelList);
    }

    // GET api/photo/getUserorders/id
    [HttpGet("getUserOrders/{id}")]
    public IActionResult GetUserOrders(string id)
    {

      List<Order> ordersList = _context.Orders.Where(x => x.UserId == id).Include(x => x.Photos).ThenInclude(y => y.Prints).Include(p => p.DeliveryData).Include(c => c.User).ToList();
      List<OrdersViewModel> ordersViewModelList = new List<OrdersViewModel>();

      foreach (var order in ordersList)
      {
        bool delivery;
        if (order.DeliveryDataId == 0) delivery = false;
        else delivery = true;
        ordersViewModelList.Add(new OrdersViewModel()
        {
          Id = order.Id,
          UserName = order.User.FirstName + " " + order.User.LastName,
          OrderDate = order.OrderDate,
          PrintsAmt = order.TotalPrints,
          TotalOrderPrice = order.TotalOrderPrice,
          Delivery = delivery,
          Bill = order.IsInvoice,
          Status = order.Status,
          IsNew = order.IsNew
        });
      }
      return new OkObjectResult(ordersViewModelList);
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
    // GET api/photo/getpaymenttypes
    [HttpGet("getPaymentTypes")]
    public IActionResult GetPaymentTypes()
    {
      var paymentTypes = _context.PaymentTypes.ToList();
      return new OkObjectResult(paymentTypes);
    }

    // GET api/photo/getdeliverydata
    [HttpGet("getDeliveryData/{id}")]
    public IActionResult GetDeliveryData(int id)
    {
      var deliveryData = _context.DeliveryDatas.Where(x => x.Id == id).FirstOrDefault();
      return new OkObjectResult(deliveryData);
    }


    [HttpPost("Upload")]
//    [EnableCors("CorsDevPolicy")]
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