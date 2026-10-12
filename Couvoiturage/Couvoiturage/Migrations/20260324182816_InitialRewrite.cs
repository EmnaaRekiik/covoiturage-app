using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Couvoiturage.Migrations
{
    /// <inheritdoc />
    public partial class InitialRewrite : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Utilisateurs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NomComplet = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Telephone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsAdmin = table.Column<bool>(type: "bit", nullable: false),
                    IsBlocked = table.Column<bool>(type: "bit", nullable: false),
                    IsDriverApproved = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Utilisateurs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Conducteurs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExperienceAnnees = table.Column<int>(type: "int", nullable: false),
                    ApprovedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conducteurs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Conducteurs_Utilisateurs_Id",
                        column: x => x.Id,
                        principalTable: "Utilisateurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DemandesConducteur",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UtilisateurId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExperienceAnnees = table.Column<int>(type: "int", nullable: false),
                    NumeroPermis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CIN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JustificatifPermis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JustificatifVehicule = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    AdminCommentaire = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SubmittedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReviewedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DemandesConducteur", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DemandesConducteur_Utilisateurs_UtilisateurId",
                        column: x => x.UtilisateurId,
                        principalTable: "Utilisateurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Vehicules",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ConducteurId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Marque = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Modele = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Couleur = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Matricule = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NombrePlaces = table.Column<int>(type: "int", nullable: false),
                    Confort = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vehicules_Conducteurs_ConducteurId",
                        column: x => x.ConducteurId,
                        principalTable: "Conducteurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Trajets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ConducteurId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VehiculeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VilleDepart = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VilleDestination = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HeureDepart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Prix = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    PlacesDisponibles = table.Column<int>(type: "int", nullable: false),
                    Arrets = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Preferences = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trajets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trajets_Conducteurs_ConducteurId",
                        column: x => x.ConducteurId,
                        principalTable: "Conducteurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Trajets_Vehicules_VehiculeId",
                        column: x => x.VehiculeId,
                        principalTable: "Vehicules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Evaluations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FromUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ToUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TrajetId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Note = table.Column<int>(type: "int", nullable: false),
                    Commentaire = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Evaluations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Evaluations_Trajets_TrajetId",
                        column: x => x.TrajetId,
                        principalTable: "Trajets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Evaluations_Utilisateurs_FromUserId",
                        column: x => x.FromUserId,
                        principalTable: "Utilisateurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Evaluations_Utilisateurs_ToUserId",
                        column: x => x.ToUserId,
                        principalTable: "Utilisateurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Reservations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TrajetId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PassagerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NombrePlaces = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reservations_Trajets_TrajetId",
                        column: x => x.TrajetId,
                        principalTable: "Trajets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reservations_Utilisateurs_PassagerId",
                        column: x => x.PassagerId,
                        principalTable: "Utilisateurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Signalements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReporterUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TargetUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TrajetId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Raison = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Signalements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Signalements_Trajets_TrajetId",
                        column: x => x.TrajetId,
                        principalTable: "Trajets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Signalements_Utilisateurs_ReporterUserId",
                        column: x => x.ReporterUserId,
                        principalTable: "Utilisateurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Signalements_Utilisateurs_TargetUserId",
                        column: x => x.TargetUserId,
                        principalTable: "Utilisateurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReservationCompanions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReservationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NomComplet = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telephone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationCompanions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReservationCompanions_Reservations_ReservationId",
                        column: x => x.ReservationId,
                        principalTable: "Reservations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DemandesConducteur_UtilisateurId",
                table: "DemandesConducteur",
                column: "UtilisateurId");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_FromUserId",
                table: "Evaluations",
                column: "FromUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_ToUserId",
                table: "Evaluations",
                column: "ToUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_TrajetId",
                table: "Evaluations",
                column: "TrajetId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationCompanions_ReservationId",
                table: "ReservationCompanions",
                column: "ReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_PassagerId",
                table: "Reservations",
                column: "PassagerId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_TrajetId_PassagerId",
                table: "Reservations",
                columns: new[] { "TrajetId", "PassagerId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Signalements_ReporterUserId",
                table: "Signalements",
                column: "ReporterUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Signalements_TargetUserId",
                table: "Signalements",
                column: "TargetUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Signalements_TrajetId",
                table: "Signalements",
                column: "TrajetId");

            migrationBuilder.CreateIndex(
                name: "IX_Trajets_ConducteurId",
                table: "Trajets",
                column: "ConducteurId");

            migrationBuilder.CreateIndex(
                name: "IX_Trajets_VehiculeId",
                table: "Trajets",
                column: "VehiculeId");

            migrationBuilder.CreateIndex(
                name: "IX_Utilisateurs_Email",
                table: "Utilisateurs",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vehicules_ConducteurId",
                table: "Vehicules",
                column: "ConducteurId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DemandesConducteur");

            migrationBuilder.DropTable(
                name: "Evaluations");

            migrationBuilder.DropTable(
                name: "ReservationCompanions");

            migrationBuilder.DropTable(
                name: "Signalements");

            migrationBuilder.DropTable(
                name: "Reservations");

            migrationBuilder.DropTable(
                name: "Trajets");

            migrationBuilder.DropTable(
                name: "Vehicules");

            migrationBuilder.DropTable(
                name: "Conducteurs");

            migrationBuilder.DropTable(
                name: "Utilisateurs");
        }
    }
}
