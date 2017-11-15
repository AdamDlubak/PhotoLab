using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
  public class OrderDefaultParam
  {
    public int Id { get; set; }
    public int FormatId { get; set; }
    public Format Format { get; set; }
    public int PaperId { get; set; }
    public Paper Paper { get; set; }
    public int Amount { get; set; }
  }
}
