using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Server.Migrations
{
    public partial class EditedDeliveryData2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_DeliveryDatas_DeliveryDataId1",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_DeliveryDataId1",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DeliveryDataId1",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "DeliveryDatas",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryDatas_UserId",
                table: "DeliveryDatas",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryDatas_AspNetUsers_UserId",
                table: "DeliveryDatas",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryDatas_AspNetUsers_UserId",
                table: "DeliveryDatas");

            migrationBuilder.DropIndex(
                name: "IX_DeliveryDatas_UserId",
                table: "DeliveryDatas");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "DeliveryDatas",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DeliveryDataId1",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_DeliveryDataId1",
                table: "AspNetUsers",
                column: "DeliveryDataId1");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_DeliveryDatas_DeliveryDataId1",
                table: "AspNetUsers",
                column: "DeliveryDataId1",
                principalTable: "DeliveryDatas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
