using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using YourApp.Services;
using System.Threading.Tasks;
using click2learnserver.Services;
using click2learnserver.Models;

namespace click2learnserver.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IEmailService _emailService;
        private static readonly Dictionary<string, int> otpMap = new();

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IEmailService emailService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailService = emailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            var user = new User
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                return CreatedAtAction(nameof(Register), new { user.Email });
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
            if (result.Succeeded)
            {
                return Ok(new { message = "Login successful" });
            }
            return Unauthorized(new { error = "Invalid email or password" });
        }

        [HttpPost("sendOTP")]
        public async Task<IActionResult> SendOtp([FromBody] SendOtpRequest request)
        {
            var otp = new Random().Next(100000, 999999);
            otpMap[request.Email] = otp;

            var result = await _emailService.SendOtpAsync(request.Email, otp);
            if (result) return Ok(new { message = "OTP sent successfully" });

            return StatusCode(500, new { message = "Failed to send OTP" });
        }

        [HttpPost("verifyOTP")]
        public IActionResult VerifyOtp([FromBody] VerifyOtpRequest request)
        {
            if (otpMap.TryGetValue(request.Email, out int storedOtp) && storedOtp == request.Otp)
            {
                otpMap.Remove(request.Email);
                return Ok(new { message = "OTP verified successfully" });
            }
            return Unauthorized(new { error = "Invalid or expired OTP" });
        }
    }

    public record VerifyOtpRequest(string Email, int Otp);
}
