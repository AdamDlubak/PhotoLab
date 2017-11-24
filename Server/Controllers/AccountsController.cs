using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Helpers;


namespace Server.Controllers
{

  [Produces("application/json")]
  [Route("api/Accounts")]
  public class AccountsController : Controller
  {
    private readonly PhotoLabContext _context;
    private readonly UserManager<Models.User> _userManager;
    private readonly IMapper _mapper;

    public AccountsController(UserManager<Models.User> userManager, IMapper mapper, PhotoLabContext appDbContext)
    {
      _userManager = userManager;
      _mapper = mapper;
      _context = appDbContext;
    }


    // Get api/accounts/client/id
    [HttpGet("client/{id}")]
    //    [Authorize("Admin")]
    public async Task<IActionResult> GetUsers(string id)
    {
      string userId = User.Identity.Name;

      var client = await _userManager.Users.Include(x => x.DeliveryData).Where(e => e.Id == id).FirstOrDefaultAsync();
      return Ok(client);
    }

    // POST api/accounts/editProfile
    [HttpPost("editprofile")]
    //    [Authorize("Admin")]
    public async Task<IActionResult> EditProfile([FromBody] UserEditViewModel userEditViewModel)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var client = await _userManager.Users.Where(e => e.Id == userEditViewModel.Id).FirstOrDefaultAsync();

      client.FirstName = userEditViewModel.FirstName;
      client.LastName = userEditViewModel.LastName;
      client.Email = userEditViewModel.Email;
      client.PhoneNumber = userEditViewModel.PhoneNumber;

      await _context.SaveChangesAsync();
      return new OkObjectResult(client);
    }
    // GET api/accounts/getDeliveryProfile/3
    [HttpGet("getdeliveryprofile/{id}")]

    //    [Authorize("Admin")]
    public async Task<IActionResult> GetDeliveryProfile(string id)
    {
        
      var user = await _userManager.Users.Include(x => x.DeliveryData).Where(e => e.Id == id).FirstOrDefaultAsync();
      UserEditDeliveryViewModel client = Mapper.Map<UserEditDeliveryViewModel>(user.DeliveryData);

      return new OkObjectResult(client);
    }

    // POST api/accounts/changePassword
    [HttpPost("changePassword")]
    //    [Authorize("Admin")]
    public async Task<IActionResult> ChangePassword([FromBody] UserChangePasswordViewModel userChangePasswordViewModel)
    {
      var user = await _userManager.Users.Where(e => e.Id == userChangePasswordViewModel.Id).FirstOrDefaultAsync();

      var result = await _userManager.ChangePasswordAsync(user, userChangePasswordViewModel.CurrentPassword, userChangePasswordViewModel.NewPassword);
      if (!result.Succeeded)
      {
        return StatusCode(400, "Error during change password!");
      }
      return new OkObjectResult(result.Succeeded);
    }

    // GET api/accounts/getInvoiceProfile/3
    [HttpGet("getinvoiceprofile/{id}")]
    //    [Authorize("Admin")]
    public async Task<IActionResult> GetInvoiceProfile(string id)
    {

      var user = await _userManager.Users.Include(x => x.InvoiceData).Where(e => e.Id == id).FirstOrDefaultAsync();
      UserEditInvoiceViewModel client = Mapper.Map<UserEditInvoiceViewModel>(user.InvoiceData);

      return new OkObjectResult(client);
    }

    // POST api/accounts/editInvoiceProfile
    [HttpPost("editinvoiceprofile")]
    //    [EnableCors("CorsDevPolicy")]
    //    [Authorize("Admin")]
    public async Task<IActionResult> EditInvoiceProfile([FromBody] UserEditInvoiceViewModel userEditInvoiceViewModel)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var client = await _userManager.Users.Include(x => x.InvoiceData).Where(e => e.Id == userEditInvoiceViewModel.Id).FirstOrDefaultAsync();

      client.InvoiceData.InvoiceType = userEditInvoiceViewModel.InvoiceType;
      client.InvoiceData.InvoiceFirstName = userEditInvoiceViewModel.InvoiceFirstName;
      client.InvoiceData.InvoiceLastName = userEditInvoiceViewModel.InvoiceLastName;
      client.InvoiceData.InvoiceCompany = userEditInvoiceViewModel.InvoiceCompany;
      client.InvoiceData.InvoiceNip = userEditInvoiceViewModel.InvoiceNip;
      client.InvoiceData.InvoiceAddress = userEditInvoiceViewModel.InvoiceAddress;
      client.InvoiceData.InvoicePostCode = userEditInvoiceViewModel.InvoicePostCode;
      client.InvoiceData.InvoiceCity = userEditInvoiceViewModel.InvoiceCity;

      await _context.SaveChangesAsync();
      return new OkObjectResult(client);
    }
    // POST api/accounts/editDeliveryProfile
    [HttpPost("editdeliveryprofile")]
//    [EnableCors("CorsDevPolicy")]
    //    [Authorize("Admin")]
    public async Task<IActionResult> EditDeliveryProfile([FromBody] UserEditDeliveryViewModel userEditDeliveryViewModel)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var client = await _userManager.Users.Include(x => x.DeliveryData).Where(e => e.Id == userEditDeliveryViewModel.Id).FirstOrDefaultAsync();

      client.DeliveryData.DeliveryFirstName = userEditDeliveryViewModel.DeliveryFirstName;
      client.DeliveryData.DeliveryLastName = userEditDeliveryViewModel.DeliveryLastName;
      client.DeliveryData.DeliveryAddress = userEditDeliveryViewModel.DeliveryAddress;
      client.DeliveryData.DeliveryCity = userEditDeliveryViewModel.DeliveryCity;
      client.DeliveryData.DeliveryPostCode = userEditDeliveryViewModel.DeliveryPostCode;

      await _context.SaveChangesAsync();
      return new OkObjectResult(client);
    }
  }
}