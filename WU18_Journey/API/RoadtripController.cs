using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Roadtrip.Add(roadtrip);

            //      await _context.SaveChangesAsync();




            var email = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier).Value;

            var user = _context.Users
                .Where(x => x.Email == email)
                .Include(x => x.UserRoadtrips)
                .FirstOrDefault();

            // var user = await _userManager.FindByEmailAsync(email);


            user.UserRoadtrips.Add(roadtrip);

            _context.Entry(user).State = EntityState.Modified;

            await _context.SaveChangesAsync();


            return Ok(user.UserRoadtrips.ToList());

        }

        // PUT: api/Roadtrip/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
