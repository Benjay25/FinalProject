using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Properties.ViewModels;
using PropertiesApp.Data;
using PropertiesApp.Data.Entities;
using WebApi.Helpers;
using WebApi.Services;

namespace Properties.WebAPI.Controllers
{
    
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
        //---------------------------------------------------------------------------------
        //POST: Users/authenticate
        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var user = _userService.Authenticate(model);
            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });
            return Ok(user);
        }
        //[Authorize] AUTHORIZE DOES NOT WORK, WILL LOOK AT IT A BIT LATER
        [HttpPost("authenticate/pw")]
        public IActionResult AuthenticatePw(Password pw)
        {
            var response = _userService.AuthenticatePw(pw);
            if ( response == "success")
                return Ok();
            else
                return BadRequest(new { message = "Password is incorrect" });
        }

        //POST: Users
        [HttpPost]
        public IActionResult PostUser(User user)
        {
            var userTemp = _userService.Find(user);

            if (userTemp != null)
                return BadRequest(new { message = "This email address already exists" });

           _userService.Add(user);

            return Ok(CreatedAtAction("GetUser", new { id = user.Id }, user));
        }

        // GET: Users
        //[Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll().ToList();
            return Ok(users);
        }

        // GET: Users/5
        //[Authorize]
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _userService.GetById(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        //PUT: Users/details/5
        //[Authorize]
        [HttpPut("details/{id}")]
        public IActionResult PutUserDetails(int id, User user)
        {
            _userService.UpdateUserDetails(id, user);
            return Ok();
        }
        //PUT: 
        //[Authorize]
        [HttpPut("seller/{id}")]
        public IActionResult PutSellerDetails(int id, User user)
        {
            _userService.UpdateSellerDetails(id, user);
            return Ok();
        }
        //PUT: 
        //[Authorize]
        [HttpPut("unlock/{id}")]
        public IActionResult Unlock(int id)
        {
            _userService.Unlock(id);
            return Ok();
        }
        //PUT: 
        //[Authorize]
        [HttpPut("lock/{id}")]
        public IActionResult Lock(int id)
        {
            _userService.Lock(id);
            return Ok();
        }
        //[Authorize]
        [HttpPut("password/{id}")]
        public IActionResult PutUserPw(Password pw)
        {
            _userService.UpdateUserPassword(pw);
            return Ok();
        }
    }
}
