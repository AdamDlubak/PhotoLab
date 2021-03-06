﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class PaymentType
    {
      public int Id { get; set; }
      public string Name { get; set; }
      public string Icon { get; set; }
      public string IconActive { get; set; }
      public string Description { get; set; }
      public float Price { get; set; }
      public bool Operative { get; set; }
  }
}
