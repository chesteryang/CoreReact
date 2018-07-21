using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoreReact.Chinook.model;
using CoreReact.model;

#pragma warning disable 1591

namespace CoreReact.Controllers
{
    [Route("api/[controller]"), Produces("application/json")]
    [ApiController]
    public class ChinookInvoicesController : ControllerBase
    {
        private readonly ChinookContext _context;

        public ChinookInvoicesController(ChinookContext context)
        {
            _context = context;
        }

        // GET: api/ChinookInvoices
        [HttpGet]
        public IEnumerable<Invoices> GetInvoices()
        {
            return _context.Invoices;
        }

        // GET: api/ChinookInvoices/Latest
        [HttpGet("Latest")]
        public IEnumerable<Invoices> GetLatestInvoices()
        {
            return _context.Invoices.OrderByDescending(i => i.InvoiceDate).Take(100)
                .Include(i => i.InvoiceItems);
        }

        // GET: api/ChinookInvoices/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInvoices([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var invoices = await _context.Invoices.FindAsync(id);

            if (invoices == null)
            {
                return NotFound();
            }

            return Ok(invoices);
        }

        // PUT: api/ChinookInvoices/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoices([FromRoute] long id, [FromBody] Invoices invoices)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != invoices.InvoiceId)
            {
                return BadRequest();
            }

            _context.Entry(invoices).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoicesExists(id))
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

        // POST: api/ChinookInvoices/PostOrder
        [HttpPost("PostOrder")]
        public async Task<IActionResult> PostOrder([FromBody] ChinookOrder order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customer = _context.Customers.FirstOrDefault(c => c.CustomerId == order.CustomerId);
            var newInvoiceId = _context.Invoices.Max(i => i.InvoiceId) + 1;
            var newInvoiceItemsId = _context.InvoiceItems.Max(i => i.InvoiceLineId) + 1;
            var existing = _context.SaleRecords.Any(s => s.SaleRecordId > 0);
            var newSaleRecordId = existing ? _context.SaleRecords.Max(s => s.SaleRecordId) + 1 : 1;

            var invoice = new Invoices
            {
                InvoiceId = newInvoiceId,
                BillingAddress = customer.Address,
                BillingCity = customer.City,
                BillingState = customer.State,
                BillingCountry = customer.Country,
                BillingPostalCode = customer.PostalCode,
                CustomerId = customer.CustomerId,
                InvoiceDate = DateTime.Now.ToString("u"),
                Total = order.TotalPrice.ToString(CultureInfo.InvariantCulture)
            };
            _context.Invoices.Add(invoice);

            foreach (var orderTrackId in order.TrackIds)
            {
                _context.InvoiceItems.Add(new InvoiceItems
                {
                    InvoiceId = newInvoiceId,
                    InvoiceLineId = newInvoiceItemsId,
                    TrackId = orderTrackId,
                    Quantity = 1,
                    UnitPrice = _context.Tracks.SingleOrDefault(t => t.TrackId == orderTrackId)?.UnitPrice
                });
                newInvoiceItemsId++;
            }

            _context.SaleRecords.Add(new SaleRecords
            {
                SaleRecordId = newSaleRecordId,
                InvoiceId = newInvoiceId,
                EmployeeId = order.EmployeeId,
            });

            await _context.SaveChangesAsync();
            // avoid loop json serialization.
            invoice.Customer = null;
            invoice.InvoiceItems = null;
            invoice.SaleRecords = null;

            return CreatedAtAction("GetInvoices", new { id = invoice.InvoiceId }, invoice);
        }

        // POST: api/ChinookInvoices
        [HttpPost]
        public async Task<IActionResult> PostInvoices([FromBody] Invoices invoices)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Invoices.Add(invoices);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (InvoicesExists(invoices.InvoiceId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetInvoices", new { id = invoices.InvoiceId }, invoices);
        }

        // DELETE: api/ChinookInvoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoices([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var invoices = await _context.Invoices.FindAsync(id);
            if (invoices == null)
            {
                return NotFound();
            }

            _context.Invoices.Remove(invoices);
            await _context.SaveChangesAsync();

            return Ok(invoices);
        }

        private bool InvoicesExists(long id)
        {
            return _context.Invoices.Any(e => e.InvoiceId == id);
        }
    }
}