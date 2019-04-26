using Microsoft.EntityFrameworkCore.Migrations;

namespace WU18_Journey.Migrations
{
    public partial class DB0016 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VehicleMake",
                table: "Roadtrip",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VehiclePlateNumber",
                table: "Roadtrip",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VehicleMake",
                table: "Roadtrip");

            migrationBuilder.DropColumn(
                name: "VehiclePlateNumber",
                table: "Roadtrip");
        }
    }
}
