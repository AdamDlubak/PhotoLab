using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
  public class InvoiceData
  {
    public int Id { get; set; }
    public bool InvoiceType { get; set; }
    public string InvoiceFirstName { get; set; }
    public string InvoiceLastName { get; set; }
    public string InvoiceCompany { get; set; }
    public string InvoiceNip { get; set; }
    public string InvoiceAddress { get; set; }
    public string InvoicePostCode { get; set; }
    public string InvoiceCity { get; set; }
    [ForeignKey("User")]
    public string UserId { get; set; }
    public User User { get; set; }
  }
}
