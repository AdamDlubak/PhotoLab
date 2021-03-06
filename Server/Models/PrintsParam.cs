﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
  public class PrintsParam
  {
    public int Id { get; set; }
    public int FormatId { get; set; }
    public virtual Format Format { get; set; }
    public int PaperId { get; set; }
    public virtual Paper Paper { get; set; }
    public int Amount { get; set; }
    public Boolean IsHorizontal { get; set; }
    public Boolean IsContain { get; set; }
    public int DeliveryTypeId { get; set; }
    public virtual DeliveryType DeliveryType { get; set; }
  }
}
