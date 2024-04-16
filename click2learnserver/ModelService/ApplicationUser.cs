using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelService
{
    public class ApplicationUser: IdentityUser
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string ProfilePic { get; set; }
        public string DOB { get; set; }
        public bool? IsInstructor { get; set; }
        public bool? IsStudent { get; set; }
        public bool? IsAdmin { get; set; }
        public string UserRole { get; set; } // Admin or User
        public bool IsActive { get; set; }
        public string CreatedOn { get; set; }
        public string UpdatedOn { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public ICollection<AddressModel> UserAddresses { get; set; }
    }
}
