using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace CoreReact.Chinook.model
{
    public partial class ChinookContext
    {
        static IConfiguration Configuration { get; set; }
        private string GetConnection()
        {
            if (Configuration == null)
            {
                var builder = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json");
                Configuration = builder.Build();
            }
            return Configuration["ConnectionStrings:ChinookDatabase"];
        }
    }
}
