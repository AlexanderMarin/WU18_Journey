using Microsoft.EntityFrameworkCore.Migrations;

namespace WU18_Journey.Migrations
{
    public partial class DB015 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ongoingRoadtrip",
                table: "Roadtrip",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ongoingRoadtrip",
                table: "Roadtrip");
        }
    }
}
