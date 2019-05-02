using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using WU18_Journey.Areas.Identity.Data;
using WU18_Journey.Models;

namespace WU18_Journey.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoadtripController : ControllerBase
    {
        private readonly WU18_JourneyContext _context;
        private readonly UserManager<WU18_JourneyUser> _userManager;


        public RoadtripController(WU18_JourneyContext context,
            UserManager<WU18_JourneyUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }



        // GET: api/Roadtrip
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetRoadtrips()
        {
            var email = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var user = _context.Users
               .Where(x => x.Email == email)
               .Include(x => x.UserRoadtrips)
               .FirstOrDefault();


            var obj = new LoggedInUser();
            obj.email = user.Email;
            // obj.defaultvehicle = user.DefaultVehicle;
            obj.AvailableVehicles = user.AvailableVehicles;


            return Ok(user.UserRoadtrips.ToList());
        }


        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetRoadtripById(int id)
        {
            var roadtrip = _context.Roadtrip.Where(x => x.RoadtripId == id).FirstOrDefault();

            return Ok(roadtrip);
        }



        // POST: api/Roadtrip/

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] Roadtrip roadtrip)

        {

            var email = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier).Value;

            var user = _context.Users
                .Where(x => x.Email == email)
                .Include(x => x.UserRoadtrips)
                .FirstOrDefault();

            foreach (Roadtrip ongoingRoadtripsCheck in user.UserRoadtrips)
            {
                if (ongoingRoadtripsCheck.ongoingRoadtrip == true)
                {
                    return NotAcceptable();

                }

            }

            

            //var roadtriptiime = _context.Roadtrip.OrderByDescending(x => x.Date).Take(1).ToList();


            //if (roadtrip.RoadtripMilesStart < roadtriptiime.FirstOrDefault().RoadtripMilesStop)
            //{
            //    return NotAcceptable();
            //}


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            _context.Roadtrip.Add(roadtrip);
            
            user.UserRoadtrips.Add(roadtrip);

            _context.Entry(user).State = EntityState.Modified;

            await _context.SaveChangesAsync();


            return Ok(user.UserRoadtrips.ToList());

        }

        private IActionResult NotAcceptable()
        {
            string ErrorMessageForNotAcceptablePostRequest = "Du måste avsluta pågående resor innan nu kan skapa nya resor.";

            throw new Exception(Newtonsoft.Json.JsonConvert.SerializeObject(ErrorMessageForNotAcceptablePostRequest));


        }

        

      

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoadtrip([FromRoute] int id, [FromBody] Roadtrip roadtrip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != roadtrip.RoadtripId)
            {
                return BadRequest();
            }

            _context.Entry(roadtrip).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoadtripExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        // code will return the info from journey which is necessary for chart report
        // GET: api/report
        [HttpPost]
        [Route("/api/rapport")]
        public IActionResult chartReport(Report report)
        {
            {
                //return the info from database
                var journeyReport = _context.Roadtrip
                    .Include(x => x.Vehicle)
                    .Where(x => x.VehiclePlateNumber == report.LicensePlate).ToList();

                var countJourney20 = 0;
                var countJourney50 = 0;
                var countJourney200 = 0;

                foreach (var item in journeyReport)
                {
                    if ((item.Date >= report.DateTimeStart.AddHours(2)) && (item.Date <= report.DateTimeStop.AddHours(25).AddMinutes(59)))
                    {

                        if ((item.RoadtripMilesStop - item.RoadtripMilesStart) <= 20)
                        {
                            countJourney20 = countJourney20 + 1;

                        }
                        if ((item.RoadtripMilesStop - item.RoadtripMilesStart) > 20 && (item.RoadtripMilesStop - item.RoadtripMilesStart) <= 50)
                        {
                            countJourney50 = countJourney50 + 1;
                        }
                        if ((item.RoadtripMilesStop - item.RoadtripMilesStart) > 50)
                        {
                            countJourney200 = countJourney200 + 1;
                        }
                    }
                }

                var length = new int[] { countJourney20, countJourney50, countJourney200 };


                return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(length));


            }
           
           

        }
        private bool RoadtripExists(int id)
        {
            return _context.Roadtrip.Any(e => e.RoadtripId == id);

        }
    }
}
