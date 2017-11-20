using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Server.Migrations
{
    public partial class RelationManytoManyPhotoPrints : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PhotoPrint",
                table: "PhotoPrint");

            migrationBuilder.DropIndex(
                name: "IX_PhotoPrint_PhotoId",
                table: "PhotoPrint");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "PhotoPrint");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PhotoPrint",
                table: "PhotoPrint",
                columns: new[] { "PhotoId", "PrintId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PhotoPrint",
                table: "PhotoPrint");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "PhotoPrint",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_PhotoPrint",
                table: "PhotoPrint",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_PhotoPrint_PhotoId",
                table: "PhotoPrint",
                column: "PhotoId");
        }
    }
}
