using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
  public class Order
  {
    public int Id { get; set; }
    public float TotalPrintsPrice { get; set; }
    public float TotalOrderPrice { get; set; }
    public int TotalPrints { get; set; }
    public DateTime? OrderDate { get; set; }
    public DateTime? EndDate { get; set; }
    public DateTime? PaymentDate { get; set; }
    public DateTime? ShippingDate { get; set; }
    public string AdditionalInfo { get; set; }
    public bool IsTraditionalTransfer { get; set; }
    public int PaymentStatus { get; set; }
    public int? DeliveryDataId { get; set; }
    public DeliveryData DeliveryData { get; set; }
    public bool IsInvoice { get; set; }
    public int? InvoiceDataId { get; set; }
    public InvoiceData InvoiceData { get; set; }
    public int DeliveryTypeId { get; set; }
    [ForeignKey("User")]
    public string UserId { get; set; }
    public User User { get; set; }
    public ICollection<Photo> Photos { get; set; }
  }
}