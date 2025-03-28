using CoreSystemBackendAPI.Data;
using CoreSystemBackendAPI.Dto;
using Dapper;

namespace CoreSystemBackendAPI.Services.Resources
{
    public class ResourcesMain : IResourcesService
    {
        private readonly ApplicationDbContext _context;

        public ResourcesMain(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateResources(CreateResources request)
        {
            //Database connection creating
            using var connection = _context.Create();

            const string query = "INSERT INTO Academic_Schedular_Resource (name, location, roomNo, capacity, additionalFacilities) VALUES (@name, @location, @roomNo, @capacity, @additionalFacilities)";
            
            int rowsAffected = await connection.ExecuteAsync(query, new
            {
                name = request.name,
                location = request.location,
                roomNo = request.roomNo,
                capacity = request.capacity,
                additionalFacilities = request.additionalFacilities
            });
            return rowsAffected > 0;
        }
    }
}
