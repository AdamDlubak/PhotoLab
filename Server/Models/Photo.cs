using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
  public class Photo
  {
    [Required]
    public int PhotoId { get; set; }
    
    [Required]
    public string FileName { get; set; }

    [Required]
    public int FileSize { get; set; }

    [Required]
    public string ImagePath { get; set; }

    [Required]
    public string ThumbPath { get; set; }

    [Required]
    public int ProjectId { get; set; }

    [Required]
    public int SectionId { get; set; }
  }
}