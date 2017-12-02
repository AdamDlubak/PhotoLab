using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Server.Migrations
{
    public partial class ChangeisTraditionalTranfseronPaymentTypeId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsTraditionalTransfer",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "PaymentTypeId",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentTypeId",
                table: "Orders");

            migrationBuilder.AddColumn<bool>(
                name: "IsTraditionalTransfer",
                table: "Orders",
                nullable: false,
                defaultValue: false);
        }
    }
}
