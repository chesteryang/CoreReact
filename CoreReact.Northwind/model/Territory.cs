using System;
using System.Collections.Generic;

namespace CoreReact.Northwind.model
{
    public partial class Territory
    {
        public string Id { get; set; }
        public string TerritoryDescription { get; set; }
        public long RegionId { get; set; }
    }
}
