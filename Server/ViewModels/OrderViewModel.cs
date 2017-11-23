using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;

namespace Server.ViewModels
{
  public class OrderViewModel
  {
    public string AdditionalInfo { get; set; }
    public string UserId { get; set; }
    public int? DeliveryDataId { get; set; }
    public int DeliveryTypeId { get; set; }
    public DateTime? EndDate { get; set; }
    public int? InvoiceDataId { get; set; }
    public bool IsInvoice { get; set; }
    public bool IsTraditionalTransfer { get; set; }
    public DateTime? OrderDate { get; set; }
    public DateTime? PaymentDate { get; set; }
    public int PaymentStatus { get; set; }
    public DateTime? ShippingDate { get; set; }
    public float TotalOrderPrice { get; set; }
    public int TotalPrints { get; set; }
    public float TotalPrintsPrice { get; set; }
    public ICollection<Photo> Photos { get; set; }
  }
}
