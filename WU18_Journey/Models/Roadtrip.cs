using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WU18_Journey.Areas.Identity.Data;

namespace WU18_Journey.Models
{
    public class Roadtrip
    {
        public int RoadtripId { get; set; }
        public string VehicleMake { get; set; }
        public string VehiclePlateNumber { get; set; }
        public int RoadtripMilesStart { get; set; }
        public int RoadtripMilesStop { get; set; }
        public DateTime Date { get; set; }
        public string StartDestination { get; set; }
        public string StopDestination { get; set; }
        public string Matter { get; set; }
        public string Note { get; set; }
        public int TravelDistance { get; set; }
        public bool ongoingRoadtrip { get; set; }
        public Vehicle Vehicle { get; set; }
        public WU18_JourneyUser User { get; set; }

        //Skickades inte med till databasen
    }
}
