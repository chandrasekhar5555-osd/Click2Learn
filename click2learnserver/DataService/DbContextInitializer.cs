using FunctionalService;

namespace DataService
{
    public static class DbContextInitializer
    {
        // Initialize all databases
        public static async Task Initialize(DataProtectionKeysContext dataProtectionKeysContext, ApplicationDbContext applicationDbContext, IFunctionalSvc functionalSvc)
        {
            // Need to check protection keys database is created or not before initializing db contexts
            await dataProtectionKeysContext.Database.EnsureCreatedAsync();

            // Need to check applicationcontext database is created or not
            await applicationDbContext.Database.EnsureCreatedAsync();

            // Need to check app contains any users or not. We can do that with identifying records in application user table as an example .
            // Check, if db contains any users. If db is not empty, then db has already seeded (from app db context)
            if(applicationDbContext.ApplicationUsers.Any())
            {
                return;
            }

            // If empty, create Admin User(Administrator) and App User(customer).
            // Which means, we need to create and add users/admin into DB in fuction services.
            await functionalSvc.CreateDefaultAdminUser();
            await functionalSvc.CreateDefaultUser();


        }
    }
}
