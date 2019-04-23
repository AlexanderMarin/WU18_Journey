using Microsoft.EntityFrameworkCore.Migrations;

namespace WU18_Journey.Migrations
{
    public partial class DB007 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StandardVehicle",
                table: "Vehicle");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "StandardVehicle",
                table: "Vehicle",
                nullable: false,
                defaultValue: false);
        }
    }
}
