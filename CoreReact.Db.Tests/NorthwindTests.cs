using System;
using System.Linq;
using Xunit;
using CoreReact.Northwind.model;

namespace CoreReact.Db.Tests
{   
    public class NorthwindTests
    {
        NorthwindContext _dbContext;
        public NorthwindTests(){
            _dbContext = new NorthwindContext();
        } 
        [Fact]
        public void CanGetCustomers(){
            // Act
            var result = _dbContext.Customer.ToList();

            // Assert
            Assert.NotNull(result);
            Assert.True(result.Count > 0);
        }
        [Fact]
        public void CanGetEmployees(){
            // Act
            var result = _dbContext.Employee.ToList();

             // Assert
            Assert.NotNull(result);
            Assert.True(result.Count > 0);           
        }
    }
}
