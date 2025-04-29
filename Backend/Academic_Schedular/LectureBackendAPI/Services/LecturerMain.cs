using Dapper;
using LectureBackendAPI.Data;
using LectureBackendAPI.Dto;
using LectureBackendAPI.Entities;

namespace LectureBackendAPI.Services.Lecturer
{
    public class LecturerMain : ILecturerService
    {
        private readonly ApplicationDbContext _context;

        public LecturerMain(ApplicationDbContext context)
        {
            _context = context;
        }

        //Data inserting endpoint
        public async Task<bool> CreateLecturer(CreateLecturer request)
        {
            //Database connection creating
            using var connection = _context.Create();
            const string query = "INSERT INTO Academic_Schedular_Lecturer (name, email, phonenumber, department, description) VALUES (@name, @email, @phonenumber, @department, @description)";
            int rowsAffected = await connection.ExecuteAsync(query, new
            {
                name = request.name,
                email = request.email,
                phonenumber = request.phonenumber,
                department = request.department,
                description = request.description
            });
            return rowsAffected > 0;
        }
        //All Data Getting endpoint

        public async Task<IEnumerable<LecturerEntity>> GetAllLecturer()
        {
            //Database connection creating
            using var connection = _context.Create();
            const string query = "SELECT * FROM Academic_Schedular_Lecturer";
            return await connection.QueryAsync<LecturerEntity>(query);
        }
        //Single Data Getting endpoint

        public async Task<LecturerEntity> GetSingleLecturer(int id)
        {
            //Database connection creating
            using var connection = _context.Create();
            const string query = "SELECT * FROM Academic_Schedular_Lecturer WHERE Id = @id";
            return await connection.QueryFirstOrDefaultAsync<LecturerEntity>(query, new { id });
        }
        // single Data Updating endpoint
        public async Task<bool> UpdateLecturer(int id, UpdateLecturer request)
        {
            using var connection = _context.Create();
            const string query = "UPDATE Academic_Schedular_Lecturer (name, email, phonenumber, department, description) VALUES (@name, @email, @phonenumber, @department, @description)";
            int rowsAffected = await connection.ExecuteAsync(query, new
            {
                id,
                name = request.name,
                email = request.email,
                phonenumber = request.phonenumber,
                department = request.department,
                description = request.description
            });
            return rowsAffected > 0;
        }
        // Single Data Deleting endpoint
        public async Task<bool> DeleteLecturer(int id)
        {
            using var connection = _context.Create();
            const string query = "DELETE FROM Academic_Schedular_Lecturer WHERE Id = @id";
            int rowsAffected = await connection.ExecuteAsync(query, new { id });
            return rowsAffected > 0;
        }
    }
}
