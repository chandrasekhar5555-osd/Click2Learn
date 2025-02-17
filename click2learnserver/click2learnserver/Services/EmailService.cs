using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using click2learnserver.Services;
using Microsoft.Extensions.Configuration;

namespace YourApp.Services
{
    public class EmailService : IEmailService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public EmailService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<bool> SendOtpAsync(string email, int otp)
        {
            var requestPayload = new { email, otp };
            var azureFunctionUrl = _configuration["AzureFunctionUrl"]; // Set this in appsettings.json

            var response = await _httpClient.PostAsJsonAsync(azureFunctionUrl, requestPayload);
            return response.IsSuccessStatusCode;
        }
    }
}
