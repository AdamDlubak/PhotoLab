using System.Collections.Generic;
using System.Collections.Specialized;
using Microsoft.AspNetCore.Identity;

namespace Server.Models
{
  public class User : IdentityUser
  {
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public int? DeliveryDataId { get; set; }
    public virtual DeliveryData DeliveryData { get; set; }
    public int? InvoiceDataId { get; set; }
    public virtual InvoiceData InvoiceData { get; set; }
    public ICollection<Order> Orders { get; set; }
  }
}