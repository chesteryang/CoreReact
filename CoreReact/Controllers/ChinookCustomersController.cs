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
    [Route("api/[controller]"), Produces("application/json")]
    [ApiController]
    public class ChinookCustomersController : ControllerBase
    {
        private readonly ChinookContext _context;

        public ChinookCustomersController(ChinookContext context)
        {
            _context = context;
        }

        // GET: api/ChinookCustomers
        [HttpGet]
        public IEnumerable<Customers> GetCustomers()
        {
            return _context.Customers;
        }

        // GET: api/ChinookCustomers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomers([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customers = await _context.Customers.FindAsync(id);

            if (customers == null)
            {
                return NotFound();
            }

            return Ok(customers);
        }

        // PUT: api/ChinookCustomers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomers([FromRoute] long id, [FromBody] Customers customers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customers.CustomerId)
            {
                return BadRequest();
            }

            _context.Entry(customers).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomersExists(id))
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

        // POST: api/ChinookCustomers
        [HttpPost]
        public async Task<IActionResult> PostCustomers([FromBody] Customers customers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Customers.Add(customers);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CustomersExists(customers.CustomerId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCustomers", new { id = customers.CustomerId }, customers);
        }

        // DELETE: api/ChinookCustomers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomers([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customers = await _context.Customers.FindAsync(id);
            if (customers == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customers);
            await _context.SaveChangesAsync();

            return Ok(customers);
        }

        private bool CustomersExists(long id)
        {
            return _context.Customers.Any(e => e.CustomerId == id);
        }
    }
}