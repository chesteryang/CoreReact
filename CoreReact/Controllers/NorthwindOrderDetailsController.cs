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
    public class NorthwindOrderDetailsController : ControllerBase
    {
        private readonly NorthwindContext _context;

        public NorthwindOrderDetailsController(NorthwindContext context)
        {
            _context = context;
        }

        // GET: api/OrderDetails
        [HttpGet]
        public IEnumerable<OrderDetail> GetOrderDetail()
        {
            return _context.OrderDetail.Include(o => o.Product)
                .Include(o => o.Product.Supplier);
        }

        // GET: api/OrderDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderDetail([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orderDetail = await _context.OrderDetail.FindAsync(id);

            if (orderDetail == null)
            {
                return NotFound();
            }

            return Ok(orderDetail);
        }

        [HttpGet("order/{orderId}")]
        public IEnumerable<OrderDetail> GetOrderDetailByOrderId([FromRoute] long orderId)
        {
            return _context.OrderDetail.Where(o => o.OrderId == orderId).Include(o => o.Product);
        }

        // PUT: api/OrderDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderDetail([FromRoute] string id, [FromBody] OrderDetail orderDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != orderDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(orderDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderDetailExists(id))
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

        // POST: api/OrderDetails
        [HttpPost]
        public async Task<IActionResult> PostOrderDetail([FromBody] OrderDetail orderDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.OrderDetail.Add(orderDetail);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (OrderDetailExists(orderDetail.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetOrderDetail", new { id = orderDetail.Id }, orderDetail);
        }

        // DELETE: api/OrderDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderDetail([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orderDetail = await _context.OrderDetail.FindAsync(id);
            if (orderDetail == null)
            {
                return NotFound();
            }

            _context.OrderDetail.Remove(orderDetail);
            await _context.SaveChangesAsync();

            return Ok(orderDetail);
        }

        private bool OrderDetailExists(string id)
        {
            return _context.OrderDetail.Any(e => e.Id == id);
        }
    }
}