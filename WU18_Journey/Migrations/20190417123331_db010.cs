using Microsoft.EntityFrameworkCore.Migrations;

namespace WU18_Journey.Migrations
{
    public partial class db010 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "defaultVehicle",
                table: "Vehicle",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "defaultVehicle",
                table: "Vehicle");
        }
    }
}
