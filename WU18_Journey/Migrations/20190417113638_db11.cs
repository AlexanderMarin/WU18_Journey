using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WU18_Journey.Migrations
{
    public partial class db11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Roadtrip",
                columns: table => new
                {
                    RoadtripId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RoadtripMilesStart = table.Column<int>(nullable: false),
                    RoadtripMilesStop = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    StartDestination = table.Column<string>(nullable: true),
                    StopDestination = table.Column<string>(nullable: true),
                    Matter = table.Column<string>(nullable: true),
                    Note = table.Column<string>(nullable: true),
                    TravelDistance = table.Column<int>(nullable: false),
                    VehicleId = table.Column<int>(nullable: true),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roadtrip", x => x.RoadtripId);
                    table.ForeignKey(
                        name: "FK_Roadtrip_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Roadtrip_Vehicle_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicle",
                        principalColumn: "VehicleId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Roadtrip_UserId",
                table: "Roadtrip",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Roadtrip_VehicleId",
                table: "Roadtrip",
                column: "VehicleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Roadtrip");
        }
    }
}
