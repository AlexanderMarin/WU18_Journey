using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WU18_Journey.Areas.Identity.Data;
using WU18_Journey.Models;

namespace WU18_Journey.Models
{
    public class WU18_JourneyContext : IdentityDbContext<WU18_JourneyUser>
    {
        public WU18_JourneyContext(DbContextOptions<WU18_JourneyContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }

        public DbSet<WU18_Journey.Models.Vehicle> Vehicle { get; set; }
       public DbSet<WU18_Journey.Models.Roadtrip> Roadtrip { get; set; }
       public DbSet<WU18_Journey.Models.Company> Company { get; set; }
    }
}
