using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
  public class Print
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
//    public int FormatId { get; set; }
    public int Format { get; set; }
//    public int PaperId { get; set; }
    public int Paper { get; set; }
    public int Amount { get; set; }

//    public int PhotoId { get; set; }
//    public Photo Photo { get; set; }
    //    public ICollection<PhotoPrint> PhotoPrints { get; set; }

  }
}
  