using Microsoft.Data.SqlClient;
using System.Data;

namespace LectureBackendAPI.Data
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
