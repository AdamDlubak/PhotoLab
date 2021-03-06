using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Helpers
{
  public class PhotoLabContext : IdentityDbContext<Models.User>
  {
    public PhotoLabContext(DbContextOptions options) : base(options) { }

    public DbSet<Format> Formats { get; set; }
    public DbSet<Paper> Papers { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<PrintsParam> PrintsParam { get; set; }
    public DbSet<DeliveryType> DeliveryTypes { get; set; }
    public DbSet<DeliveryData> DeliveryDatas { get; set; }
    public DbSet<PaymentType> PaymentTypes { get; set; }
    public DbSet<PaymentStatus> PaymentStatuses { get; set; }
    public DbSet<InvoiceData> InvoiceDatas { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Print> Prints { get; set; }
    public DbSet<SystemStat> SystemStats { get; set; }
    public DbSet<FrontierStat> FrontierStats { get; set; }
    public DbSet<EvidenceStat> EvidenceStats { get; set; }


    //    protected override void OnModelCreating(ModelBuilder modelBuilder)
    //    {
    //      base.OnModelCreating(modelBuilder);
    //
    //      modelBuilder.Entity<PhotoPrint>()
    //        .HasKey(bc => new { bc.PhotoId, bc.PrintId });
    //
    //      modelBuilder.Entity<PhotoPrint>()
    //        .HasOne(bc => bc.Photo)
    //        .WithMany(b => b.PhotoPrints)
    //        .HasForeignKey(bc => bc.PhotoId);
    //
    //      modelBuilder.Entity<PhotoPrint>()
    //        .HasOne(bc => bc.Print)
    //        .WithMany(c => c.PhotoPrints)
    //        .HasForeignKey(bc => bc.PrintId);
    //    }
  }



}