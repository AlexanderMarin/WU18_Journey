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
    public class VehiclesController : ControllerBase
    {
        private readonly WU18_JourneyContext _context;
        private readonly UserManager<WU18_JourneyUser> _userManager;


        public VehiclesController(WU18_JourneyContext context, UserManager<WU18_JourneyUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Vehicles
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetVehicle()
        {

            var email = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var user = _context.Users
               .Where(x => x.Email == email)
               .Include(x => x.AvailableVehicles)
               .FirstOrDefault();


            var obj = new LoggedInUser();
            obj.email = user.Email;
            // obj.defaultvehicle = user.DefaultVehicle;
            obj.AvailableVehicles = user.AvailableVehicles;

            
            return Ok(obj);
        }

        //// GET: api/Vehicles VILL RETURNA EN DEFAULT CAR MEN KAN INTE LADDA BÅDA APIS SAMTIDIGT
        //[HttpGet]
        //[Authorize]
        //public async Task<IActionResult> GetDefaultVehicle()
        //{
            

        //    var defaultCar = _context.Vehicle.Where(x => x.defaultVehicle == true).FirstOrDefault();


        //    return Ok(defaultCar);
        //}

        // GET: api/Vehicles/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vehicle = await _context.Vehicle.FindAsync(id);

            if (vehicle == null)
            {
                return NotFound();
            }

            return Ok(vehicle);
        }

        // PUT: api/Vehicles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicle([FromRoute] int id, [FromBody] Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vehicle.VehicleId)
            {
                return BadRequest();
            }

            _context.Entry(vehicle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(id))
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


        // POST: api/Vehicles
        [HttpPost]
        public async Task<IActionResult> PostVehicle([FromBody] Vehicle vehicle)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Vehicle.Add(vehicle);

      //      await _context.SaveChangesAsync();




            var email = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var user = _context.Users
                .Where(x => x.Email == email)
                .Include(x => x.AvailableVehicles)
                .FirstOrDefault();

           // var user = await _userManager.FindByEmailAsync(email);


            user.AvailableVehicles.Add(vehicle);

            _context.Entry(user).State = EntityState.Modified;

             await _context.SaveChangesAsync();


                return Ok(user.AvailableVehicles.ToList());

}

// DELETE: api/Vehicles/5
[HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vehicle = await _context.Vehicle.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            _context.Vehicle.Remove(vehicle);
            await _context.SaveChangesAsync();

            return Ok(vehicle);
        }

        private bool VehicleExists(int id)
        {
            return _context.Vehicle.Any(e => e.VehicleId == id);
        }
    }
}


