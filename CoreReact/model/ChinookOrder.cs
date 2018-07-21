using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
#pragma warning disable 1591

namespace CoreReact.model
{
    public class ChinookOrder
    {
        [Required]
        public long EmployeeId { get; set; }
        [Required]
        public long CustomerId { get; set; }
        [Required]
        public IEnumerable<long> TrackIds { get; set; }
        [Required]
        public decimal TotalPrice { get; set; } 
    }
}
