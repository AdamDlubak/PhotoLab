using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Server.Migrations
{
    public partial class RelationManytoManyPhotoPrints6 : Migration
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

            migrationBuilder.DropColumn(
                name: "FormatId",
                table: "Prints");

            migrationBuilder.DropColumn(
                name: "PaperId",
                table: "Prints");

            migrationBuilder.AddColumn<int>(
                name: "Format",
                table: "Prints",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Paper",
                table: "Prints",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Format",
                table: "Prints");

            migrationBuilder.DropColumn(
                name: "Paper",
                table: "Prints");

            migrationBuilder.AddColumn<int>(
                name: "FormatId",
                table: "Prints",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PaperId",
                table: "Prints",
                nullable: true);

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
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Prints_Papers_PaperId",
                table: "Prints",
                column: "PaperId",
                principalTable: "Papers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
