using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Portfolio.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace Portfolio.API.Data
{
    public class PortfolioDbContext : DbContext
    {
        public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options)
            : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure value converter and comparer for Technologies collection
            var listToStringConverter = new ValueConverter<List<string>, string>(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());

            var valueComparer = new ValueComparer<List<string>>(
                (c1, c2) => c1.SequenceEqual(c2),
                c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                c => c.ToList());

            modelBuilder.Entity<Project>()
                .Property(p => p.Technologies)
                .HasConversion(listToStringConverter)
                .Metadata.SetValueComparer(valueComparer);

            // Configure other entities and relationships
            modelBuilder.Entity<Project>()
                .Property(p => p.Title)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Project>()
                .Property(p => p.Description)
                .IsRequired()
                .HasMaxLength(500);

            // ContactMessage configuration
            modelBuilder.Entity<ContactMessage>()
                .Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<ContactMessage>()
                .Property(c => c.Email)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<ContactMessage>()
                .Property(c => c.Message)
                .IsRequired()
                .HasMaxLength(1000);
        }
    }
}