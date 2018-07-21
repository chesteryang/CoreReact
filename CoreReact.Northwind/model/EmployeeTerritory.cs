using System;
using System.Collections.Generic;

namespace CoreReact.Northwind.model
{
    public partial class EmployeeTerritory
    {
        public string Id { get; set; }
        public long EmployeeId { get; set; }
        public string TerritoryId { get; set; }
    }
}
