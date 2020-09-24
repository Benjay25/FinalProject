using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PropertiesApp.Data;
using Properties_WebAPI.Services;
using Properties.ViewModels;
using Microsoft.AspNetCore.Cors;
using WebApi.Helpers;
using PropertiesApp.Data.Entities;

namespace Properties_WebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AdvertsController : ControllerBase
    {
        private IAdvertService _advertService;

        public AdvertsController(IAdvertService adServ)
        {
            _advertService = adServ;
        }

        //---------------------------------------------------------------------------------
        // POST: Adverts
        //[Authorize] AUTHORIZE DOES NOT WORK, WILL LOOK AT IT A BIT LATER
        [HttpPost]
        public IActionResult PostAdvert(Advert advert)
        {
            _advertService.Add(advert);
            return CreatedAtAction("GetAdvert", new { id = advert.Id }, advert);
        }

        // POST: Adverts/favourite/5
        //[Authorize] AUTHORIZE DOES NOT WORK, WILL LOOK AT IT A BIT LATER
        [HttpPost("favourite/{id}/{userId}")]
        public IActionResult AddFavourite(int id, int userId)
        {
            _advertService.AddFavourite(id, userId);
            return Ok();
        }

        [HttpGet("favourite/{id}/{userId}")]
        public IActionResult CheckFavourite(int id, int userId)
        {
            bool check = _advertService.CheckFavourite(id, userId);
            return Ok(check);
        }

        [HttpPost("filters")]
        public IActionResult GetAllOrdered(Filter filters)
        {
            var ads = _advertService.GetFilteredAdverts(filters);
            return Ok(ads);
        }

        // GET: Adverts
        [HttpGet]
        public IActionResult GetAll()
        {
            var ads = _advertService.GetAll();
            return Ok(ads);
        }
        // GET: Adverts/all
        [HttpGet("all")]
        public IActionResult GetAllAdverts()
        {
            var ads = _advertService.GetAllAds();
            return Ok(ads);
        }

        // GET: Adverts/5
        [HttpGet("{id}")]
        public IActionResult GetAdvert(int id)
        {
            var advert = _advertService.GetById(id);

            if (advert == null)
            {
                return NotFound();
            }

            return Ok(advert);
        }

        [HttpGet("favourites/{id}")]
        public IActionResult GetFavourites(int id)
        {
            var advert = _advertService.GetFavourites(id);

            if (advert == null)
            {
                return BadRequest("You have no favourited adverts!");
            }

            return Ok(advert);
        }
        //[Authorize]
        [HttpGet("myadverts/{id}")]
        public IActionResult GetCurrentUserAdvert(int id)
        {
            var advert = _advertService.GetAdvertsByUserId(id);

            if (advert == null)
            {
                return NotFound();
            }

            return Ok(advert);
        }
        //[Authorize]
        [HttpGet("locations")]
        public LocationsModel GetLocations()
        {
            var locations = _advertService.GetLocations();
            return locations;
        }
        // PUT: Adverts/5
        //[Authorize]
        [HttpPut("{id}")]
        public IActionResult PutAdvert(int id, Advert advert) //TO BE IMPLEMENTED checking logged in user ID matches Updated ad ID
        {
            _advertService.UpdateAdvert(advert);
            return Ok();
        }
        // PUT: Adverts/togglefav/5
        //[Authorize]
        [HttpPut("togglefeatured/{id}")]
        public IActionResult PutAdvert(int id) //TO BE IMPLEMENTED checking logged in user ID matches Updated ad ID
        {
            _advertService.ToggleFeatured(id);
            return Ok();
        }
        // PUT: Adverts/5
        //[Authorize]
        [HttpPut("delete/{id}")]
        public IActionResult PutShadowDeleteAdvert(int id)
        {
            _advertService.DeleteAdvert(id);
            return Ok();
        }

        [HttpDelete("unfavourite/{id}/{userId}")]
        public IActionResult DeleteFavourite(int id, int userId)
        {
            _advertService.DeleteFavourite(id, userId);
            return Ok();
        }

        private bool AdvertExists(int id)
        {
            return _advertService.GetById(id) == null; 
        }
    }
}
