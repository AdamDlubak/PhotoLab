using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Server.Migrations
{
    public partial class RelationManytoManyPhotoPrints2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prints_Photos_PhotoId",
                table: "Prints");

            migrationBuilder.DropIndex(
                name: "IX_Prints_PhotoId",
                table: "Prints");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "Prints");

            migrationBuilder.CreateTable(
                name: "PhotoPrint",
                columns: table => new
                {
                    PhotoId = table.Column<int>(type: "int", nullable: false),
                    PrintId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhotoPrint", x => new { x.PhotoId, x.PrintId });
                    table.ForeignKey(
                        name: "FK_PhotoPrint_Photos_PhotoId",
                        column: x => x.PhotoId,
                        principalTable: "Photos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PhotoPrint_Prints_PrintId",
                        column: x => x.PrintId,
                        principalTable: "Prints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PhotoPrint_PrintId",
                table: "PhotoPrint",
                column: "PrintId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PhotoPrint");

            migrationBuilder.AddColumn<int>(
                name: "PhotoId",
                table: "Prints",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Prints_PhotoId",
                table: "Prints",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prints_Photos_PhotoId",
                table: "Prints",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
