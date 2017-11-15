using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Server.Migrations
{
    public partial class AddedForeignKeyfromOrderDefaultParam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Paper",
                table: "OrderDefaultParams");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "OrderDefaultParams");

            migrationBuilder.AddColumn<int>(
                name: "FormatId",
                table: "OrderDefaultParams",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PaperId",
                table: "OrderDefaultParams",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_OrderDefaultParams_FormatId",
                table: "OrderDefaultParams",
                column: "FormatId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderDefaultParams_PaperId",
                table: "OrderDefaultParams",
                column: "PaperId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDefaultParams_Formats_FormatId",
                table: "OrderDefaultParams",
                column: "FormatId",
                principalTable: "Formats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDefaultParams_Papers_PaperId",
                table: "OrderDefaultParams",
                column: "PaperId",
                principalTable: "Papers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDefaultParams_Formats_FormatId",
                table: "OrderDefaultParams");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderDefaultParams_Papers_PaperId",
                table: "OrderDefaultParams");

            migrationBuilder.DropIndex(
                name: "IX_OrderDefaultParams_FormatId",
                table: "OrderDefaultParams");

            migrationBuilder.DropIndex(
                name: "IX_OrderDefaultParams_PaperId",
                table: "OrderDefaultParams");

            migrationBuilder.DropColumn(
                name: "FormatId",
                table: "OrderDefaultParams");

            migrationBuilder.DropColumn(
                name: "PaperId",
                table: "OrderDefaultParams");

            migrationBuilder.AddColumn<int>(
                name: "Paper",
                table: "OrderDefaultParams",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Size",
                table: "OrderDefaultParams",
                nullable: false,
                defaultValue: 0);
        }
    }
}
