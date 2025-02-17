using System.Threading.Tasks;

namespace click2learnserver.Services
{
    public interface IEmailService
    {
        Task<bool> SendOtpAsync(string email, int otp);
    }
}
