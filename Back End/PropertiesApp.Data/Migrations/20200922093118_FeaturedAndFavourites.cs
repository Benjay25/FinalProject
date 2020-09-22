using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertiesApp.Data.Migrations
{
    public partial class FeaturedAndFavourites : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Adverts",
                table: "Adverts");

            migrationBuilder.RenameTable(
                name: "Adverts",
                newName: "Advert");

            migrationBuilder.AddColumn<bool>(
                name: "Admin",
                table: "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Locked",
                table: "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Advert",
                table: "Advert",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "FavouriteAdverts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    AdvertId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FavouriteAdverts", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FavouriteAdverts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Advert",
                table: "Advert");

            migrationBuilder.DropColumn(
                name: "Admin",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Locked",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "Advert",
                newName: "Adverts");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Adverts",
                table: "Adverts",
                column: "Id");
        }
    }
}
