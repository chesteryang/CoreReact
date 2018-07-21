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
    public class ChinookSaleRecordsController : ControllerBase
    {
        private readonly ChinookContext _context;

        public ChinookSaleRecordsController(ChinookContext context)
        {
            _context = context;
        }

        // GET: api/ChinookSaleRecords
        [HttpGet]
        public IEnumerable<SaleRecords> GetSaleRecords()
        {
            return _context.SaleRecords;
        }

        // GET: api/ChinookSaleRecords/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSaleRecords([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var saleRecords = await _context.SaleRecords.FindAsync(id);

            if (saleRecords == null)
            {
                return NotFound();
            }

            return Ok(saleRecords);
        }

        // PUT: api/ChinookSaleRecords/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSaleRecords([FromRoute] long id, [FromBody] SaleRecords saleRecords)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != saleRecords.SaleRecordId)
            {
                return BadRequest();
            }

            _context.Entry(saleRecords).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleRecordsExists(id))
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

        // POST: api/ChinookSaleRecords
        [HttpPost]
        public async Task<IActionResult> PostSaleRecords([FromBody] SaleRecords saleRecords)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.SaleRecords.Add(saleRecords);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SaleRecordsExists(saleRecords.SaleRecordId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSaleRecords", new { id = saleRecords.SaleRecordId }, saleRecords);
        }

        // DELETE: api/ChinookSaleRecords/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSaleRecords([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var saleRecords = await _context.SaleRecords.FindAsync(id);
            if (saleRecords == null)
            {
                return NotFound();
            }

            _context.SaleRecords.Remove(saleRecords);
            await _context.SaveChangesAsync();

            return Ok(saleRecords);
        }

        private bool SaleRecordsExists(long id)
        {
            return _context.SaleRecords.Any(e => e.SaleRecordId == id);
        }
    }
}