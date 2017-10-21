using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Helpers
{
    public class PhotoLabContext : IdentityDbContext
  {
        public PhotoLabContext(DbContextOptions options) : base(options) { }

        public DbSet<AdminUser> AdminUsers { get; set; }
  }
}