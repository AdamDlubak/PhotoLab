using System.Collections.Specialized;
using Microsoft.AspNetCore.Identity;

namespace Server.Models
{
  // Add profile data for application users by adding properties to this class
  public class User : IdentityUser
  {
    // Extended Properties
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Avatar { get; set; }
    public string Phone { get; set; }
    public string DeliveryFirstName { get; set; }
    public string DeliveryLastName { get; set; }
    public string DeliveryAddress { get; set; }
    public string DeliveryPostCode { get; set; }
    public string DeliveryCity { get; set; }

    public bool InvoiceType { get; set; }
    public string InvoiceFirstName { get; set; }
    public string InvoiceLastName { get; set; }
    public string InvoiceCompany { get; set; }
    public string InvoiceNip { get; set; }
    public string InvoiceAddress { get; set; }
    public string InvoicePostCode { get; set; }
    public string InvoiceCity { get; set; }
  }
}