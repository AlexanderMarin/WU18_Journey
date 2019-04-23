using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WU18_Journey.Models
{
    public class Vehicle
    {
        public int VehicleId { get; set; }
       // public bool StandardVehicle { get; set; }
       // UPPDATERA FÖR ATT TA BORT RADEN OVAN
        public bool Active { get; set; }
        public bool defaultVehicle { get; set; }
        public string Make { get; set; }
        public string PlateNumber { get; set; }
        public Company Company { get; set; }
        // public User User { get; set; }
    }
}
