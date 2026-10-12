using Covoiturage.Entities;
using Microsoft.EntityFrameworkCore;

namespace Covoiturage.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Utilisateur> Utilisateurs => Set<Utilisateur>();
    public DbSet<Conducteur> Conducteurs => Set<Conducteur>();
    public DbSet<DemandeConducteur> DemandesConducteur => Set<DemandeConducteur>();
    public DbSet<Vehicule> Vehicules => Set<Vehicule>();
    public DbSet<Trajet> Trajets => Set<Trajet>();
    public DbSet<Reservation> Reservations => Set<Reservation>();
    public DbSet<ReservationCompanion> ReservationCompanions => Set<ReservationCompanion>();
    public DbSet<Evaluation> Evaluations => Set<Evaluation>();
    public DbSet<Signalement> Signalements => Set<Signalement>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Utilisateur>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Conducteur>()
            .HasKey(c => c.Id);

        modelBuilder.Entity<Conducteur>()
            .HasOne(c => c.Utilisateur)
            .WithOne(u => u.ConducteurProfil)
            .HasForeignKey<Conducteur>(c => c.Id)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Trajet>()
            .Property(t => t.Prix)
            .HasPrecision(18, 2);

        modelBuilder.Entity<DemandeConducteur>()
            .HasOne(d => d.Utilisateur)
            .WithMany(u => u.DemandesConducteur)
            .HasForeignKey(d => d.UtilisateurId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Vehicule>()
            .HasOne(v => v.Conducteur)
            .WithMany(c => c.Vehicules)
            .HasForeignKey(v => v.ConducteurId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Trajet>()
            .HasOne(t => t.Conducteur)
            .WithMany(c => c.Trajets)
            .HasForeignKey(t => t.ConducteurId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Trajet>()
            .HasOne(t => t.Vehicule)
            .WithMany(v => v.Trajets)
            .HasForeignKey(t => t.VehiculeId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Reservation>()
            .HasOne(r => r.Passager)
            .WithMany(u => u.Reservations)
            .HasForeignKey(r => r.PassagerId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Reservation>()
            .HasOne(r => r.Trajet)
            .WithMany(t => t.Reservations)
            .HasForeignKey(r => r.TrajetId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Reservation>()
            .HasIndex(r => new { r.TrajetId, r.PassagerId })
            .IsUnique();

        modelBuilder.Entity<ReservationCompanion>()
            .HasOne(rc => rc.Reservation)
            .WithMany(r => r.Companions)
            .HasForeignKey(rc => rc.ReservationId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Evaluation>()
            .HasOne(e => e.FromUser)
            .WithMany(u => u.EvaluationsDonnees)
            .HasForeignKey(e => e.FromUserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Evaluation>()
            .HasOne(e => e.ToUser)
            .WithMany(u => u.EvaluationsRecues)
            .HasForeignKey(e => e.ToUserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Evaluation>()
            .HasOne(e => e.Trajet)
            .WithMany(t => t.Evaluations)
            .HasForeignKey(e => e.TrajetId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Signalement>()
            .HasOne(s => s.ReporterUser)
            .WithMany(u => u.SignalementsEnvoyes)
            .HasForeignKey(s => s.ReporterUserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Signalement>()
            .HasOne(s => s.TargetUser)
            .WithMany(u => u.SignalementsRecus)
            .HasForeignKey(s => s.TargetUserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Signalement>()
            .HasOne(s => s.Trajet)
            .WithMany(t => t.Signalements)
            .HasForeignKey(s => s.TrajetId)
            .OnDelete(DeleteBehavior.SetNull);

        base.OnModelCreating(modelBuilder);
    }
}