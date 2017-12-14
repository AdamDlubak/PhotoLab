using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Server.Models;

namespace Server.Helpers.Interfaces
{
  public interface IJwtFactory
  {
    Task<string> GenerateEncodedToken(string email, ClaimsIdentity identity);
    Task<ClaimsIdentity> GenerateClaimsIdentity(string email, User user, UserManager<User> userManager);
  }
}