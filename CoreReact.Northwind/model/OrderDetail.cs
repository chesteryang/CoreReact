using System;
using System.Collections.Generic;

namespace CoreReact.Northwind.model
{
    public partial class OrderDetail
    {
        public string Id { get; set; }
        public long OrderId { get; set; }
        public long ProductId { get; set; }
        public string UnitPrice { get; set; }
        public long Quantity { get; set; }
        public double Discount { get; set; }
        public Product Product { get; set; }
    }
}
