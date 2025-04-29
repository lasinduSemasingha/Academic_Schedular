using Microsoft.Data.SqlClient;
using System.Data;

namespace CoreSystemBackendAPI.Data
{
    public class ApplicationDbContext
    {
        private readonly string _connectionString;

        public ApplicationDbContext(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")!;
        }

        public IDbConnection Create() => new SqlConnection(_connectionString);
    }
}
