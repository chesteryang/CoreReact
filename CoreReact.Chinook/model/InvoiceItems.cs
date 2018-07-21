using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace CoreReact.Chinook.model
{
    public partial class InvoiceItems
    {
        public long InvoiceLineId { get; set; }
        public long InvoiceId { get; set; }
        public long TrackId { get; set; }
        public string UnitPrice { get; set; }
        public long Quantity { get; set; }

        [JsonIgnore]
        public Invoices Invoice { get; set; }
        public Tracks Track { get; set; }
    }
}
