using System.Collections.Specialized;
using Microsoft.AspNetCore.Identity;

namespace Server.Models
{
  // Add profile data for application users by adding properties to this class
  public class User : IdentityUser
  {
    // Extended Properties
    public string FirstName { get; set; }
    public string LastName { get; set; }

  }
}