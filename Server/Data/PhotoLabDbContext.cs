using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Helpers
{
    public class PhotoLabContext : IdentityDbContext<User>
  {
        public PhotoLabContext(DbContextOptions options) : base(options) { }

//        public DbSet<Name> Names { get; set; }
  }
}