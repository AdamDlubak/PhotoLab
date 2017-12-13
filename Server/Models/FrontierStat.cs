using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class FrontierStat
    {
    public int Id { get; set; }
    public DateTime StatDate { get; set; }
    public DateTime SubmitDate { get; set; }
    public Format Format { get; set; }
    public int FormatId { get; set; }
    public int Quantity { get; set; }
    }
}
