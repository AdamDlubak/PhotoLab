﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using Server.Helpers;
using System;

namespace Server.Migrations
{
    [DbContext(typeof(PhotoLabContext))]
    [Migration("20171212202414_Added Evidence Stat")]
    partial class AddedEvidenceStat
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.0-rtm-26452")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Server.Models.DeliveryData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("DeliveryAddress");

                    b.Property<string>("DeliveryCity");

                    b.Property<string>("DeliveryFirstName");

                    b.Property<string>("DeliveryLastName");

                    b.Property<string>("DeliveryPostCode");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique()
                        .HasFilter("[UserId] IS NOT NULL");

                    b.ToTable("DeliveryDatas");
                });

            modelBuilder.Entity("Server.Models.DeliveryType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Icon");

                    b.Property<string>("IconActive");

                    b.Property<string>("Name");

                    b.Property<float>("Price");

                    b.HasKey("Id");

                    b.ToTable("DeliveryTypes");
                });

            modelBuilder.Entity("Server.Models.EvidenceStat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<float>("Proceeds");

                    b.Property<int>("Quantity");

                    b.Property<DateTime>("StatDate");

                    b.Property<DateTime>("SubmitDate");

                    b.HasKey("Id");

                    b.ToTable("EvidenceStats");
                });

            modelBuilder.Entity("Server.Models.Format", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Height");

                    b.Property<string>("Name");

                    b.Property<float>("Price");

                    b.Property<int>("Width");

                    b.HasKey("Id");

                    b.ToTable("Formats");
                });

            modelBuilder.Entity("Server.Models.FrontierStat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("FormatId");

                    b.Property<int>("Quantity");

                    b.Property<DateTime>("StatDate");

                    b.Property<DateTime>("SubmitDate");

                    b.HasKey("Id");

                    b.HasIndex("FormatId");

                    b.ToTable("FrontierStats");
                });

            modelBuilder.Entity("Server.Models.InvoiceData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("InvoiceAddress");

                    b.Property<string>("InvoiceCity");

                    b.Property<string>("InvoiceCompany");

                    b.Property<string>("InvoiceFirstName");

                    b.Property<string>("InvoiceLastName");

                    b.Property<string>("InvoiceNip");

                    b.Property<string>("InvoicePostCode");

                    b.Property<bool>("InvoiceType");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique()
                        .HasFilter("[UserId] IS NOT NULL");

                    b.ToTable("InvoiceDatas");
                });

            modelBuilder.Entity("Server.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AdditionalInfo");

                    b.Property<int?>("DeliveryDataId");

                    b.Property<int>("DeliveryTypeId");

                    b.Property<DateTime?>("EndDate");

                    b.Property<int?>("InvoiceDataId");

                    b.Property<bool>("IsInvoice");

                    b.Property<bool>("IsNew");

                    b.Property<DateTime?>("OrderDate");

                    b.Property<DateTime?>("PaymentDate");

                    b.Property<int>("PaymentStatusId");

                    b.Property<int>("PaymentTypeId");

                    b.Property<DateTime?>("ShippingDate");

                    b.Property<int>("Status");

                    b.Property<float>("TotalOrderPrice");

                    b.Property<int>("TotalPrints");

                    b.Property<float>("TotalPrintsPrice");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("DeliveryDataId");

                    b.HasIndex("InvoiceDataId");

                    b.HasIndex("PaymentStatusId");

                    b.HasIndex("PaymentTypeId");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Server.Models.Paper", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Papers");
                });

            modelBuilder.Entity("Server.Models.PaymentStatus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("PaymentStatuses");
                });

            modelBuilder.Entity("Server.Models.PaymentType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Icon");

                    b.Property<string>("IconActive");

                    b.Property<string>("Name");

                    b.Property<bool>("Operative");

                    b.Property<float>("Price");

                    b.HasKey("Id");

                    b.ToTable("PaymentTypes");
                });

            modelBuilder.Entity("Server.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsContain");

                    b.Property<bool>("IsHorizontal");

                    b.Property<string>("Name");

                    b.Property<int>("OrderId");

                    b.Property<string>("Path");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("Server.Models.Print", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Amount");

                    b.Property<int>("FormatId");

                    b.Property<int>("PaperId");

                    b.Property<int?>("PhotoId");

                    b.HasKey("Id");

                    b.HasIndex("PhotoId");

                    b.ToTable("Prints");
                });

            modelBuilder.Entity("Server.Models.PrintsParam", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Amount");

                    b.Property<int>("DeliveryTypeId");

                    b.Property<int>("FormatId");

                    b.Property<bool>("IsContain");

                    b.Property<bool>("IsHorizontal");

                    b.Property<int>("PaperId");

                    b.HasKey("Id");

                    b.HasIndex("DeliveryTypeId");

                    b.HasIndex("FormatId");

                    b.HasIndex("PaperId");

                    b.ToTable("PrintsParam");
                });

            modelBuilder.Entity("Server.Models.SystemStat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<int>("FormatId");

                    b.Property<int>("PaperId");

                    b.Property<int>("Quantity");

                    b.HasKey("Id");

                    b.HasIndex("FormatId");

                    b.HasIndex("PaperId");

                    b.ToTable("SystemStats");
                });

            modelBuilder.Entity("Server.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<int?>("DeliveryDataId");

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstName");

                    b.Property<int?>("InvoiceDataId");

                    b.Property<string>("LastName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<int>("OrdersAmount");

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Server.Models.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Server.Models.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Server.Models.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Server.Models.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Server.Models.DeliveryData", b =>
                {
                    b.HasOne("Server.Models.User", "User")
                        .WithOne("DeliveryData")
                        .HasForeignKey("Server.Models.DeliveryData", "UserId");
                });

            modelBuilder.Entity("Server.Models.FrontierStat", b =>
                {
                    b.HasOne("Server.Models.Format", "Format")
                        .WithMany()
                        .HasForeignKey("FormatId");
                });

            modelBuilder.Entity("Server.Models.InvoiceData", b =>
                {
                    b.HasOne("Server.Models.User", "User")
                        .WithOne("InvoiceData")
                        .HasForeignKey("Server.Models.InvoiceData", "UserId");
                });

            modelBuilder.Entity("Server.Models.Order", b =>
                {
                    b.HasOne("Server.Models.DeliveryData", "DeliveryData")
                        .WithMany()
                        .HasForeignKey("DeliveryDataId");

                    b.HasOne("Server.Models.InvoiceData", "InvoiceData")
                        .WithMany()
                        .HasForeignKey("InvoiceDataId");

                    b.HasOne("Server.Models.PaymentStatus", "PaymentStatus")
                        .WithMany()
                        .HasForeignKey("PaymentStatusId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Server.Models.PaymentType", "PaymentType")
                        .WithMany()
                        .HasForeignKey("PaymentTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Server.Models.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Server.Models.Photo", b =>
                {
                    b.HasOne("Server.Models.Order", "Order")
                        .WithMany("Photos")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Server.Models.Print", b =>
                {
                    b.HasOne("Server.Models.Photo")
                        .WithMany("Prints")
                        .HasForeignKey("PhotoId");
                });

            modelBuilder.Entity("Server.Models.PrintsParam", b =>
                {
                    b.HasOne("Server.Models.DeliveryType", "DeliveryType")
                        .WithMany()
                        .HasForeignKey("DeliveryTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Server.Models.Format", "Format")
                        .WithMany()
                        .HasForeignKey("FormatId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Server.Models.Paper", "Paper")
                        .WithMany()
                        .HasForeignKey("PaperId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Server.Models.SystemStat", b =>
                {
                    b.HasOne("Server.Models.Format", "Format")
                        .WithMany()
                        .HasForeignKey("FormatId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Server.Models.Paper", "Paper")
                        .WithMany()
                        .HasForeignKey("PaperId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
