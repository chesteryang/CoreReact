using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using CoreReact.Northwind.model;
using Microsoft.AspNetCore.Mvc;
using NewsAPI;
using NewsAPI.Models;
using Newtonsoft.Json;
#pragma warning disable 1591

namespace CoreReact.Controllers
{
    [Route("api/[controller]"), Produces("application/json"), ApiController]
    public class SampleDataController : ControllerBase
    {
        private NorthwindContext _dbContext;
        private readonly IHttpClientFactory _clientFactory;

        public SampleDataController(NorthwindContext dbContext, IHttpClientFactory clientFactory)
        {
            _dbContext = dbContext;
            _clientFactory = clientFactory;
        }
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts(int startDateIndex)
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index + startDateIndex).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        [HttpGet("[action]")]
        public IEnumerable<Customer> GetCustomers()
        {
            return _dbContext.Customer.ToList();
        }

        [HttpGet("[action]")]
        public ArticlesResult News()
        {
            var newsApiClient = new NewsApiClient("4f9333875c98436787fa163b2604664a");
            var topNews = new TopHeadlinesRequest { Country = NewsAPI.Constants.Countries.CA };
            return newsApiClient.GetTopHeadlines(topNews);
        }

        [HttpGet("[action]")]
        public async Task<List<Post>> Posts()
        {
            var client = _clientFactory.CreateClient();
            var response = await client.SendAsync(new HttpRequestMessage { RequestUri = new Uri("https://jsonplaceholder.typicode.com/posts") });
            if (response.IsSuccessStatusCode)
            {
                var r = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<List<Post>>(r);
            }
            return new List<Post>();
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }

        public class Post
        {
            public int UserId { get; set; }
            public int Id { get; set; }
            public string Title { get; set; }
            public string Body { get; set; }
        }
    }
}
