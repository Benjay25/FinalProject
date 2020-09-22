using Microsoft.EntityFrameworkCore;
using PropertiesApp.Data.Entities;
using System;

namespace PropertiesApp.Data
{
    public class PropertiesContext: DbContext
    {
        private const string connectionString = "Data Source = (localdb)\\MSSQLLocalDB; Initial Catalog = PropertiesAppData";

        public PropertiesContext(DbContextOptions<PropertiesContext> options): base(options)
        {
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Advert> Adverts { get; set; }
        public DbSet<Favourites> FavouriteAdverts { get; set; }
    }
}
