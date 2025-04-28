using Dapper;
using LectureBackendAPI.Data;
using LectureBackendAPI.Dto;

namespace LectureBackendAPI.Services
{
    public class LecturerMain : ILecturerService
    {
        private readonly ApplicationDbContext _context;

        public LecturerMain(ApplicationDbContext context)
        {
            _context = context;
        }


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
    }
}
