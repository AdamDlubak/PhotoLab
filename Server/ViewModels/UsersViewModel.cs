using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;

namespace Server.ViewModels
{
  public class UsersViewModel
  {
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }

    public int DeliveryDataId { get; set; }
    public DeliveryData DeliveryData { get; set; }
    public int InvoiceDataId { get; set; }
    public InvoiceData InvoiceData { get; set; }
    public ICollection<Order> Orders { get; set; }

  }
}
