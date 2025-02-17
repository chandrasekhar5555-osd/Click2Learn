using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace click2learnserver.Models
{
    public class User : IdentityUser
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string? Major { get; set; }
        public string? Grade { get; set; }
    }

    public class RegisterRequest
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class LoginRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class SendOtpRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
