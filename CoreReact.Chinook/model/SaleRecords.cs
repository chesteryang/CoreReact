using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace CoreReact.Chinook.model
{
    public partial class SaleRecords
    {
        public long SaleRecordId { get; set; }
        public long EmployeeId { get; set; }
        public long InvoiceId { get; set; }
        public Employees Employee { get; set; }
        public Invoices Invoice { get; set; }
    }
}
