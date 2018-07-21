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
    public class ChinookTracksController : ControllerBase
    {
        private readonly ChinookContext _context;

        public ChinookTracksController(ChinookContext context)
        {
            _context = context;
        }

        // GET: api/ChinookTracks
        [HttpGet]
        public IEnumerable<Tracks> GetTracks()
        {
            return _context.Tracks;
        }

        // GET: api/ChinookTracks/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTracks([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tracks = await _context.Tracks.FindAsync(id);

            if (tracks == null)
            {
                return NotFound();
            }

            return Ok(tracks);
        }

        // PUT: api/ChinookTracks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTracks([FromRoute] long id, [FromBody] Tracks tracks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tracks.TrackId)
            {
                return BadRequest();
            }

            _context.Entry(tracks).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TracksExists(id))
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

        // POST: api/ChinookTracks
        [HttpPost]
        public async Task<IActionResult> PostTracks([FromBody] Tracks tracks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Tracks.Add(tracks);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TracksExists(tracks.TrackId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTracks", new { id = tracks.TrackId }, tracks);
        }

        // DELETE: api/ChinookTracks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTracks([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tracks = await _context.Tracks.FindAsync(id);
            if (tracks == null)
            {
                return NotFound();
            }

            _context.Tracks.Remove(tracks);
            await _context.SaveChangesAsync();

            return Ok(tracks);
        }

        private bool TracksExists(long id)
        {
            return _context.Tracks.Any(e => e.TrackId == id);
        }
    }
}