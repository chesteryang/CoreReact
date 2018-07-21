using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CoreReact.Chinook.model;
using Xunit;

namespace CoreReact.Db.Tests
{
    public class ChinookTests
    {
        private ChinookContext _dbContext;
        public ChinookTests()
        {
            _dbContext = new ChinookContext();
        }

        [Fact]
        public void CanGetCustomers()
        {
            // Act
            var result = _dbContext.Customers.ToList();

            // Assert
            Assert.NotNull(result);
            Assert.True(result.Count > 0);
        }
    }
}
