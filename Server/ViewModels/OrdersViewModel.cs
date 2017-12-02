using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels
{
    public class OrdersViewModel
    {
    public int Id { get; set; }
    public string UserName { get; set; }
    public DateTime? OrderDate { get; set; }
    public int PrintsAmt { get; set; }
    public float TotalOrderPrice { get; set; }
    public bool Delivery { get; set; }
    public bool Bill { get; set; }
    public int Status { get; set; }
    public bool IsNew { get; set; }
  }
}
