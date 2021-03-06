﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
  public class Photo
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Path { get; set; }
    public bool IsContain { get; set; }
    public bool IsHorizontal { get; set; }
    public int OrderId { get; set; }
    public Order Order { get; set; }
    public ICollection<Print> Prints { get; set; }
  }
}