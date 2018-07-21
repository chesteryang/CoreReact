using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoreReact.Chinook.model;
#pragma warning disable 1591

namespace CoreReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChinookArtistsController : ControllerBase
    {
        private readonly ChinookContext _context;

        public ChinookArtistsController(ChinookContext context)
        {
            _context = context;
        }

        // GET: api/ChinookArtists
        [HttpGet]
        public IEnumerable<Artists> GetArtists()
        {
            return _context.Artists;
        }

        // GET: api/ChinookArtists/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetArtists([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var artists = await _context.Artists.FindAsync(id);

            if (artists == null)
            {
                return NotFound();
            }

            return Ok(artists);
        }

        // PUT: api/ChinookArtists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtists([FromRoute] long id, [FromBody] Artists artists)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != artists.ArtistId)
            {
                return BadRequest();
            }

            _context.Entry(artists).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArtistsExists(id))
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

        // POST: api/ChinookArtists
        [HttpPost]
        public async Task<IActionResult> PostArtists([FromBody] Artists artists)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Artists.Add(artists);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ArtistsExists(artists.ArtistId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetArtists", new { id = artists.ArtistId }, artists);
        }

        // DELETE: api/ChinookArtists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtists([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var artists = await _context.Artists.FindAsync(id);
            if (artists == null)
            {
                return NotFound();
            }

            _context.Artists.Remove(artists);
            await _context.SaveChangesAsync();

            return Ok(artists);
        }

        private bool ArtistsExists(long id)
        {
            return _context.Artists.Any(e => e.ArtistId == id);
        }
    }
}