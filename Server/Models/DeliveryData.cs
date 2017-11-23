using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
  public class DeliveryData
  {
    public int Id { get; set; }
    public string DeliveryFirstName { get; set; }
    public string DeliveryLastName { get; set; }
    public string DeliveryAddress { get; set; }
    public string DeliveryPostCode { get; set; }
    public string DeliveryCity { get; set; }
    [ForeignKey("User")]
    public string UserId { get; set; }
    public User User { get; set; }
  }
}
