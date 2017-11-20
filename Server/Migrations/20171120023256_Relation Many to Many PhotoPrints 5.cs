using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Server.Migrations
{
    public partial class RelationManytoManyPhotoPrints5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prints_Formats_FormatId",
                table: "Prints");

            migrationBuilder.DropForeignKey(
                name: "FK_Prints_Papers_PaperId",
                table: "Prints");

            migrationBuilder.DropForeignKey(
                name: "FK_Prints_Photos_PhotoId",
                table: "Prints");

            migrationBuilder.AlterColumn<int>(
                name: "PhotoId",
                table: "Prints",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "PaperId",
                table: "Prints",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "FormatId",
                table: "Prints",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

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

            migrationBuilder.AddForeignKey(
                name: "FK_Prints_Photos_PhotoId",
                table: "Prints",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prints_Formats_FormatId",
                table: "Prints");

            migrationBuilder.DropForeignKey(
                name: "FK_Prints_Papers_PaperId",
                table: "Prints");

            migrationBuilder.DropForeignKey(
                name: "FK_Prints_Photos_PhotoId",
                table: "Prints");

            migrationBuilder.AlterColumn<int>(
                name: "PhotoId",
                table: "Prints",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PaperId",
                table: "Prints",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FormatId",
                table: "Prints",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Prints_Photos_PhotoId",
                table: "Prints",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
