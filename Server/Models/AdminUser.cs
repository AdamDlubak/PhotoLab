using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
  public class AdminUser
  {
      public int Id { get; set; }
      public string IdentityId { get; set; }
      public User Identity { get; set; }  // navigation property
      public string Level { get; set; } // Whatever property
  }
}