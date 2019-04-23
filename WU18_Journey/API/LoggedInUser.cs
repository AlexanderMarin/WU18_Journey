using System.Collections.Generic;
using WU18_Journey.Models;

namespace WU18_Journey.API
{
    internal class LoggedInUser
    {

        public int defaultvehicle { get; set; }
        public string email { get; set; }
        public ICollection<Vehicle> AvailableVehicles { get; set; }
        public ICollection<Roadtrip> UserRoadtrips { get; set; }



        public LoggedInUser()
        {
            
        }
    }
}