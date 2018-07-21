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
    public class ChinookEmployeesController : ControllerBase
    {
        private readonly ChinookContext _context;

        public ChinookEmployeesController(ChinookContext context)
        {
            _context = context;
        }

        // GET: api/ChinookEmployees
        [HttpGet]
        public IEnumerable<Employees> GetEmployees()
        {
            return _context.Employees;
        }

        // GET: api/ChinookEmployees/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployees([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employees = await _context.Employees.FindAsync(id);

            if (employees == null)
            {
                return NotFound();
            }

            return Ok(employees);
        }

        // PUT: api/ChinookEmployees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployees([FromRoute] long id, [FromBody] Employees employees)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employees.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(employees).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeesExists(id))
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

        // POST: api/ChinookEmployees
        [HttpPost]
        public async Task<IActionResult> PostEmployees([FromBody] Employees employees)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Employees.Add(employees);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EmployeesExists(employees.EmployeeId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEmployees", new { id = employees.EmployeeId }, employees);
        }

        // DELETE: api/ChinookEmployees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployees([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employees = await _context.Employees.FindAsync(id);
            if (employees == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employees);
            await _context.SaveChangesAsync();

            return Ok(employees);
        }

        private bool EmployeesExists(long id)
        {
            return _context.Employees.Any(e => e.EmployeeId == id);
        }
    }
}