using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels
{
    public class UserEditInvoiceViewModel
    {
      public string Id { get; set; }
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
