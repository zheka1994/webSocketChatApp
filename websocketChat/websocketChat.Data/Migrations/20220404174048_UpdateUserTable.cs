using Microsoft.EntityFrameworkCore.Migrations;

namespace websocketChat.Data.Migrations
{
    public partial class UpdateUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "pwd_hash",
                table: "users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "pwd_salt",
                table: "users",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "pwd_hash",
                table: "users");

            migrationBuilder.DropColumn(
                name: "pwd_salt",
                table: "users");
        }
    }
}
