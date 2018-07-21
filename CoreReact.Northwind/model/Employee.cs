using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CoreReact.Northwind.model
{
    public partial class Employee
    {
        public long Id { get; set; }
        [Required(ErrorMessage="Last name is required, server side validation")]
        public string LastName { get; set; }
        [Required(ErrorMessage="First name is required, server side validation")]
        public string FirstName { get; set; }
        [Required(ErrorMessage="Title is required, server side validation")]
        public string Title { get; set; }
        [Required(ErrorMessage="Title of Courtesy is required, server side validation")]
        public string TitleOfCourtesy { get; set; }
        public string BirthDate { get; set; }
        public string HireDate { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string HomePhone { get; set; }
        public string Extension { get; set; }
        public byte[] Photo { get; set; }
        public string Notes { get; set; }
        public long? ReportsTo { get; set; }
        public string PhotoPath { get; set; }
    }
}
