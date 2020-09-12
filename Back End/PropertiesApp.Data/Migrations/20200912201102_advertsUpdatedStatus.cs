using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertiesApp.Data.Migrations
{
    public partial class advertsUpdatedStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Hidden",
                table: "Adverts");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Adverts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Adverts");

            migrationBuilder.AddColumn<bool>(
                name: "Hidden",
                table: "Adverts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
