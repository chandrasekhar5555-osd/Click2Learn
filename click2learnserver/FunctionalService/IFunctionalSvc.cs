
namespace FunctionalService
{
    public interface IFunctionalSvc
    {
        Task CreateDefaultAdminUser();
        Task CreateDefaultUser();
    }
}
