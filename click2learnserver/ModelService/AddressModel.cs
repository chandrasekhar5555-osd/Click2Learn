using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ModelService
{
    public class AddressModel
    {
        [Key]
        public int AddressId { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string State { get; set; }
        [Required]
        public string Country { get; set; }
        public string Type { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
