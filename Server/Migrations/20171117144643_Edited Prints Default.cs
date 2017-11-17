using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Server.Migrations
{
    public partial class EditedPrintsDefault : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderDefaultParams");

            migrationBuilder.CreateTable(
                name: "PrintsParam",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    FormatId = table.Column<int>(type: "int", nullable: false),
                    IsContain = table.Column<bool>(type: "bit", nullable: false),
                    IsHorizontal = table.Column<bool>(type: "bit", nullable: false),
                    PaperId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrintsParam", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PrintsParam_Formats_FormatId",
                        column: x => x.FormatId,
                        principalTable: "Formats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PrintsParam_Papers_PaperId",
                        column: x => x.PaperId,
                        principalTable: "Papers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PrintsParam_FormatId",
                table: "PrintsParam",
                column: "FormatId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PrintsParam_PaperId",
                table: "PrintsParam",
                column: "PaperId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PrintsParam");

            migrationBuilder.CreateTable(
                name: "OrderDefaultParams",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Amount = table.Column<int>(nullable: false),
                    FormatId = table.Column<int>(nullable: false),
                    PaperId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDefaultParams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderDefaultParams_Formats_FormatId",
                        column: x => x.FormatId,
                        principalTable: "Formats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDefaultParams_Papers_PaperId",
                        column: x => x.PaperId,
                        principalTable: "Papers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
        }
    }
}
