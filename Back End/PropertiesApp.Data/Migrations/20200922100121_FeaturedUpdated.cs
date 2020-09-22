using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertiesApp.Data.Migrations
{
    public partial class FeaturedUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Advert",
                table: "Advert");

            migrationBuilder.RenameTable(
                name: "Advert",
                newName: "Adverts");

            migrationBuilder.AddColumn<bool>(
                name: "Featured",
                table: "Adverts",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Adverts",
                table: "Adverts",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Adverts",
                table: "Adverts");

            migrationBuilder.DropColumn(
                name: "Featured",
                table: "Adverts");

            migrationBuilder.RenameTable(
                name: "Adverts",
                newName: "Advert");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Advert",
                table: "Advert",
                column: "Id");
        }
    }
}
