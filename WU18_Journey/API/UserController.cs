using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WU18_Journey.Areas.Identity.Data;
using WU18_Journey.Models;

namespace WU18_Journey.API
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize]
    public class UserController : ControllerBase
    {

        private readonly UserManager<WU18_JourneyUser> _userManager;
        private readonly SignInManager<WU18_JourneyUser> _signInManager;
        private readonly WU18_JourneyContext _context;

        public UserController(
            UserManager<WU18_JourneyUser> userManager,
            SignInManager<WU18_JourneyUser> signInManager,
            WU18_JourneyContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }

        // POST: api/User
        [HttpPost]
        [Route("/token")]
        // [AllowAnonymous]
       // [Authorize]
        public async Task<IActionResult> LoginAsync([FromBody] Login login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(login.email);
            if (user == null)
            {
                return BadRequest();
            }
            var passwordSignInResult = await _signInManager.PasswordSignInAsync(user, login.password, isPersistent: true, lockoutOnFailure: false);
            if (!passwordSignInResult.Succeeded)
            {
                return BadRequest();
            }
            var tokenString = GenerateJSONWebToken(login.email);
            return Ok(new { token = tokenString });
        }

        private string GenerateJSONWebToken(string email)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mySecretKeyString"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
            new Claim(JwtRegisteredClaimNames.Sub, email),
            new Claim(JwtRegisteredClaimNames.Email, email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var token = new JwtSecurityToken("domain.com",
              "domain.com",
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // GET: api/User
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {

            //  var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var email = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var user = _context.Users
               .Where(x => x.Email == email)
               .Include(x => x.AvailableVehicles)
               .FirstOrDefault();

          //  var user = await _userManager.FindByEmailAsync(userId);

            var obj = new LoggedInUser();
            obj.email = user.Email;
            // obj.defaultvehicle = user.DefaultVehicle;
            obj.AvailableVehicles = user.AvailableVehicles;


            return Ok(obj);
        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }


        // PUT: api/User/5
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
