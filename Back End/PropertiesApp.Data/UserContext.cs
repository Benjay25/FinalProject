using Microsoft.EntityFrameworkCore;
using PropertiesApp.Domain;
using System;

namespace PropertiesApp.Data
{
    public class UserContext: DbContext
    {
        public DbSet<User> Users { get; set; }
    }
}
