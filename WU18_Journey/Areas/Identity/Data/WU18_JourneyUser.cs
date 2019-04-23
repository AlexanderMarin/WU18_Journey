using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using WU18_Journey.Models;

namespace WU18_Journey.Areas.Identity.Data
{
    // Add profile data for application users by adding properties to the WU18_JourneyUser class
    public class WU18_JourneyUser : IdentityUser
    {
       
        public Company Company { get; set; }

        public Vehicle DefaultVehicle { get; set; }

        public ICollection<Vehicle> AvailableVehicles { get; set; }
        public ICollection<Roadtrip> UserRoadtrips { get; set; }

    }
}

