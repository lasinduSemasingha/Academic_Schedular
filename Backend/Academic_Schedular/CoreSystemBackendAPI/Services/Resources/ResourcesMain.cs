using CoreSystemBackendAPI.Data;
using CoreSystemBackendAPI.Dto;
using CoreSystemBackendAPI.Entities;
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
        // Data inserting endpoint
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
        // All Data Getting endpoint
        public async Task<IEnumerable<ResourceEntity>> GetAllResources()
        {
            //Database connection creating
            using var connection = _context.Create();
            const string query = "SELECT * FROM Academic_Schedular_Resource";
            return await connection.QueryAsync<ResourceEntity>(query);
        }
        // Single Data Getting endpoint
        public async Task<ResourceEntity> GetSingleResources(int id)
        {
            //Database connection creating
            using var connection = _context.Create();
            const string query = "SELECT * FROM Academic_Schedular_Resource WHERE rId = @id";
            return await connection.QueryFirstOrDefaultAsync<ResourceEntity>(query, new { id });
        }
        // Single Data Updating endpoint
        public async Task<bool> UpdateResources(int id, UpdateResources request)
        {
            using var connection = _context.Create();
            const string query = "UPDATE Academic_Schedular_Resource SET name = @name, location = @location, roomNo = @roomNo, capacity = @capacity, additionalFacilities = @additionalFacilities WHERE rId = @id";
            int rowsAffected = await connection.ExecuteAsync(query, new
            {
                id,
                name = request.name,
                location = request.location,
                roomNo = request.roomNo,
                capacity = request.capacity,
                additionalFacilities = request.additionalFacilities
            });
            return rowsAffected > 0;
        }
        // Single Data Deleting endpoint
        public async Task<bool> DeleteResources(int id)
        {
            using var connection = _context.Create();
            const string query = "DELETE FROM Academic_Schedular_Resource WHERE rId = @id";
            int rowsAffected = await connection.ExecuteAsync(query, new { id });
            return rowsAffected > 0;
        }
    }
}
