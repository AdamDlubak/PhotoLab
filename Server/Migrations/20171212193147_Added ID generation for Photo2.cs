using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Server.Migrations
{
    public partial class AddedIDgenerationforPhoto2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prints_Formats_FormatId",
                table: "Prints");

            migrationBuilder.DropForeignKey(
                name: "FK_Prints_Papers_PaperId",
                table: "Prints");

            migrationBuilder.DropIndex(
                name: "IX_Prints_FormatId",
                table: "Prints");

            migrationBuilder.DropIndex(
                name: "IX_Prints_PaperId",
                table: "Prints");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Prints_FormatId",
                table: "Prints",
                column: "FormatId");

            migrationBuilder.CreateIndex(
                name: "IX_Prints_PaperId",
                table: "Prints",
                column: "PaperId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prints_Formats_FormatId",
                table: "Prints",
                column: "FormatId",
                principalTable: "Formats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Prints_Papers_PaperId",
                table: "Prints",
                column: "PaperId",
                principalTable: "Papers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
