using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace CoreReact.Chinook.model
{
    public partial class Employees
    {
        public Employees()
        {
            Customers = new HashSet<Customers>();
            InverseReportsToNavigation = new HashSet<Employees>();
            SaleRecords = new HashSet<SaleRecords>();
        }

        public long EmployeeId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Title { get; set; }
        public long? ReportsTo { get; set; }
        public string BirthDate { get; set; }
        public string HireDate { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }

        [JsonIgnore]
        public Employees ReportsToNavigation { get; set; }
        [JsonIgnore]
        public ICollection<Customers> Customers { get; set; }
        [JsonIgnore]
        public ICollection<Employees> InverseReportsToNavigation { get; set; }
        [JsonIgnore]
        public ICollection<SaleRecords> SaleRecords { get; set; }
    }
}
