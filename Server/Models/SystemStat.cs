using System;

namespace Server.Models
{
  public class SystemStat
  {
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public int FormatId { get; set; }
    public Format Format { get; set; }
    public int PaperId { get; set; }
    public Paper Paper { get; set; }
    public int Quantity { get; set; }
  }
}
