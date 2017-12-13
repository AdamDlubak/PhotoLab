using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class EvidenceFormViewModel
    {
      public int? Id { get; set; }
      public DateTime StatDate { get; set; }
      public float Proceeds { get; set; }
      public int Quantity { get; set; }
  }
}
