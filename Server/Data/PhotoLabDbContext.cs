using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Helpers
{
    public class PhotoLabContext : IdentityDbContext<User>
  {
        public PhotoLabContext(DbContextOptions options) : base(options) { }

        public DbSet<Photo> Photos { get; set; }
        public DbSet<Format> Formats { get; set; }
        public DbSet<Paper> Papers { get; set; }
        public DbSet<PrintsParam> PrintsParam { get; set; }
  }
}