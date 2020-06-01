using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CoreReact.Northwind.model
{
    public partial class NorthwindContext : DbContext
    {
        public static readonly ILoggerFactory MyLoggerFactory
           = LoggerFactory.Create(builder => { builder.AddConsole(); });
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<CustomerCustomerDemo> CustomerCustomerDemo { get; set; }
        public virtual DbSet<CustomerDemographic> CustomerDemographic { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<EmployeeTerritory> EmployeeTerritory { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<OrderDetail> OrderDetail { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Region> Region { get; set; }
        public virtual DbSet<Shipper> Shipper { get; set; }
        public virtual DbSet<Supplier> Supplier { get; set; }
        public virtual DbSet<Territory> Territory { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite(GetConnection()).UseLoggerFactory(MyLoggerFactory);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CategoryName).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.Description).HasColumnType("VARCHAR(8000)");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnType("VARCHAR(8000)")
                    .ValueGeneratedNever();

                entity.Property(e => e.Address).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.City).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.CompanyName).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.ContactName).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.ContactTitle).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.Country).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.Fax).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.Phone).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.PostalCode).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.Region).HasColumnType("VARCHAR(8000)");
            });

            modelBuilder.Entity<CustomerCustomerDemo>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnType("VARCHAR(8000)")
                    .ValueGeneratedNever();

                entity.Property(e => e.CustomerTypeId).HasColumnType("VARCHAR(8000)");
            });

            modelBuilder.Entity<CustomerDemographic>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnType("VARCHAR(8000)")
                    .ValueGeneratedNever();

                entity.Property(e => e.CustomerDesc).HasColumnType("VARCHAR(8000)");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Address).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.BirthDate).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.City).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.Country).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.Extension).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.FirstName).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.HireDate).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.HomePhone).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.LastName).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.Notes).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.PhotoPath).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.PostalCode).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.Region).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.Title).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.TitleOfCourtesy).HasColumnType("VARCHAR(8000)");
            });

            modelBuilder.Entity<EmployeeTerritory>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnType("VARCHAR(8000)")
                    .ValueGeneratedNever();

                entity.Property(e => e.TerritoryId).HasColumnType("VARCHAR(8000)");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CustomerId).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.Freight)
                    .IsRequired()
                    .HasColumnType("DECIMAL");

                entity.Property(e => e.OrderDate).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.RequiredDate).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.ShipAddress).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.ShipCity).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.ShipCountry).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.ShipName).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.ShipPostalCode).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.ShipRegion).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.ShippedDate).HasColumnType("VARCHAR(8000)");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnType("VARCHAR(8000)")
                    .ValueGeneratedNever();

                entity.Property(e => e.Discount).HasColumnType("DOUBLE");

                entity.Property(e => e.UnitPrice)
                    .IsRequired()
                    .HasColumnType("DECIMAL");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.ProductName).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.QuantityPerUnit).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.UnitPrice)
                    .IsRequired()
                    .HasColumnType("DECIMAL");
            });

            modelBuilder.Entity<Region>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.RegionDescription).HasColumnType("VARCHAR(8000)");
            });

            modelBuilder.Entity<Shipper>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CompanyName).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.Phone).HasColumnType("VARCHAR(8000)");
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Address).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.City).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.CompanyName).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.ContactName).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.ContactTitle).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.Country).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.Fax).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.HomePage).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.Phone).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.PostalCode).HasColumnType("VARCHAR(8000)");

                entity.Property(e => e.Region).HasColumnType("VARCHAR(8000)");
            });

            modelBuilder.Entity<Territory>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnType("VARCHAR(8000)")
                    .ValueGeneratedNever();

                entity.Property(e => e.TerritoryDescription).HasColumnType("VARCHAR(8000)");
            });
        }
    }
}
