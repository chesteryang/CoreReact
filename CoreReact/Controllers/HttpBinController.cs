using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CoreReact.Controllers
{
    /// <summary>
    /// using HttpClient to access http://httpbin.org api
    /// </summary>
    [Route("api/[controller]"), Produces("application/json")]
    public class HttpBinController : Controller
    {
        private static readonly HttpClient Client;

 
        static HttpBinController()
        {
            Client = new HttpClient { BaseAddress = new Uri("http://httpbin.org/")};
            Client.DefaultRequestHeaders.UserAgent
                .Add(new ProductInfoHeaderValue(new ProductHeaderValue("HttpClient-Chester-Yang")));
        }

        private static string GetFromClient(string url)
        {
            return GetResult(Client.GetAsync(url));
        }

        private static string GetResult(Task<HttpResponseMessage> message)
        {
            return message.Result.Content.ReadAsStringAsync().Result;
        }

        /// <summary>
        /// Get http://httpbin.org/
        /// </summary>
        /// <returns>result</returns>
        /// <response code="200">Returns the response body of getting http://httpbin.org/ </response>
        [HttpGet]
        public string Get()
        {
            return GetFromClient("");
        }

        /// <summary>
        /// Get http://httpbin.org/ip
        /// </summary>
        /// <returns>result</returns>
        /// <response code="200">Returns the response body of getting http://httpbin.org/ip </response>
        [HttpGet("ip")]
        public string GetIp()
        {
            return GetFromClient("ip");
        }

        /// <summary>
        /// Get http://httpbin.org/get
        /// </summary>
        /// <returns>result</returns>
        [HttpGet("get")]
        public string GetData()
        {
            return GetFromClient("get");
        }

        /// <summary>
        /// Get http://httpbin.org/uuid
        /// </summary>
        /// <returns>result</returns>
        [HttpGet("uuid")]
        public string Uuid()
        {
            return GetFromClient("uuid");
        }

        /// <summary>
        /// Get http://httpbin.org/user-agent
        /// </summary>
        /// <returns>result</returns>
       [HttpGet("user-agent")]
        public string UserAgent()
        {
            return GetFromClient("user-agent");
        }

        /// <summary>
        /// Get http://httpbin.org/headers
        /// </summary>
        /// <returns>result</returns>
        [HttpGet("headers")]
        public string Headers()
        {
            return GetFromClient("headers");
        }

        /// <summary>
        /// Post http://httpbin.org/post
        /// </summary>
        /// <returns>result</returns>
        [HttpPost]
        public string Post()
        {
            return GetResult(Client.PostAsync("post", new StringContent("posted data")));
        }

        /// <summary>
        /// Put http://httpbin.org/put
        /// </summary>
        /// <returns>result</returns>
        [HttpPut]
        public string Put()
        {
            return GetResult(Client.PutAsync("put", new StringContent("put data")));
        }

        /// <summary>
        /// Delete http://httpbin.org/delete
        /// </summary>
        /// <returns>result</returns>
        [HttpDelete]
        public string Delete()
        {
            return GetResult(Client.DeleteAsync("delete"));
        }
    }
}
