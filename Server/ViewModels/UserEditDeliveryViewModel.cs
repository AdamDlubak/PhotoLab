using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels
{
    public class UserEditDeliveryViewModel
    {
      public string Id { get; set; }
      public string DeliveryFirstName { get; set; }
      public string DeliveryLastName { get; set; }
      public string DeliveryAddress { get; set; }
      public string DeliveryCity { get; set; }
      public string DeliveryPostCode { get; set; }
  }
}
