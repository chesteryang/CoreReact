using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoreReact.Chinook.model;
using Swashbuckle.AspNetCore.Annotations;
#pragma warning disable 1591

namespace CoreReact.Controllers
{
    [Route("api/[controller]"), Produces("application/json")]
    [ApiController]
    public class ChinookAlbumsController : ControllerBase
    {
        private readonly ChinookContext _context;

        public ChinookAlbumsController(ChinookContext context)
        {
            _context = context;
        }

        // GET: api/ChinookAlbums
        [HttpGet]
        [SwaggerOperation(Tags = new[] { "Chinook Tag" })]
        public IEnumerable<Albums> GetAlbums()
        {
            return _context.Albums;
        }

        // GET: api/ChinookAlbums/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAlbums([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var albums = await _context.Albums.FindAsync(id);

            if (albums == null)
            {
                return NotFound();
            }

            return Ok(albums);
        }

        // PUT: api/ChinookAlbums/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlbums([FromRoute] long id, [FromBody] Albums albums)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != albums.AlbumId)
            {
                return BadRequest();
            }

            _context.Entry(albums).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlbumsExists(id))
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

        // POST: api/ChinookAlbums
        [HttpPost]
        public async Task<IActionResult> PostAlbums([FromBody] Albums albums)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Albums.Add(albums);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AlbumsExists(albums.AlbumId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAlbums", new { id = albums.AlbumId }, albums);
        }

        // DELETE: api/ChinookAlbums/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbums([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var albums = await _context.Albums.FindAsync(id);
            if (albums == null)
            {
                return NotFound();
            }

            _context.Albums.Remove(albums);
            await _context.SaveChangesAsync();

            return Ok(albums);
        }

        private bool AlbumsExists(long id)
        {
            return _context.Albums.Any(e => e.AlbumId == id);
        }
    }
}