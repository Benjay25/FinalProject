using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PropertiesApp.Data;
using Properties_WebAPI.Services;

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
        //[Authorize]
        [HttpPost]
        public IActionResult PostAdvert(Advert advert)
        {
            _advertService.Add(advert);
            return CreatedAtAction("GetAdvert", new { id = advert.Id }, advert);
        }

        // GET: Adverts
        [HttpGet]
        public IActionResult GetAll()
        {
            var ads = _advertService.GetAll();
            return Ok(ads);
        }

        // GET: Adverts/5
        //[Authorize]
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
        public Dictionary<string, List<string>> GetLocations()
        {
            var locations = _advertService.GetLocations();
            return locations;
        }
        // PUT: Adverts/5
        //[Authorize]
        [HttpPut("{id}")]
        public IActionResult PutAdvert(Advert advert)
        {
            _advertService.UpdateAdvert(advert);
            return Ok();
        }

        // DELETE: Adverts/5
        //[Authorize]
        [HttpDelete("{id}")]
        //public async Task<ActionResult<Advert>> DeleteAdvert(int id)
        //{
        //    var advert = await _context.Adverts.FindAsync(id);
        //    if (advert == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Adverts.Remove(advert);
        //    await _context.SaveChangesAsync();

        //    return advert;
        //}

        private bool AdvertExists(int id)
        {
            return _advertService.GetById(id) == null; 
        }
    }
}
