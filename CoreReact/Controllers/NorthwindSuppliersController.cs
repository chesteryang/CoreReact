using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoreReact.Northwind.model;
#pragma warning disable 1591

namespace CoreReact.Controllers
{
    [Route("api/[controller]"), Produces("application/json")]
    [ApiController]
    public class NorthwindSuppliersController : ControllerBase
    {
        private readonly NorthwindContext _context;

        public NorthwindSuppliersController(NorthwindContext context)
        {
            _context = context;
        }

        // GET: api/Suppliers
        [HttpGet]
        public IEnumerable<Supplier> GetSupplier()
        {
            return _context.Supplier;
        }

        // GET: api/Suppliers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSupplier([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var supplier = await _context.Supplier.FindAsync(id);

            if (supplier == null)
            {
                return NotFound();
            }

            return Ok(supplier);
        }

        // PUT: api/Suppliers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupplier([FromRoute] long id, [FromBody] Supplier supplier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != supplier.Id)
            {
                return BadRequest();
            }

            _context.Entry(supplier).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupplierExists(id))
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

        // POST: api/Suppliers
        [HttpPost]
        public async Task<IActionResult> PostSupplier([FromBody] Supplier supplier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Supplier.Add(supplier);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SupplierExists(supplier.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSupplier", new { id = supplier.Id }, supplier);
        }

        // DELETE: api/Suppliers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var supplier = await _context.Supplier.FindAsync(id);
            if (supplier == null)
            {
                return NotFound();
            }

            _context.Supplier.Remove(supplier);
            await _context.SaveChangesAsync();

            return Ok(supplier);
        }

        private bool SupplierExists(long id)
        {
            return _context.Supplier.Any(e => e.Id == id);
        }
    }
}