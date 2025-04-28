using System.Net;
using Dapper;
using StudentBackendAPI.Data;
using StudentBackendAPI.Dto;

namespace StudentBackendAPI.Services
{
    public class StudentMain : IStudentService
    {
        private readonly ApplicationDbContext _context;

        public StudentMain(ApplicationDbContext context)
        {
            _context = context;
        }

        

        public async Task<bool> CreateStudent(CreateStudent request)
        {
            //database connection
            using var connection = _context.Create();

            const string query = "INSERT INTO Academic_Schedular_Student (name ,studentId, email, contact, dob, address, faculty, year, semester) VALUES (@name ,@studentId, @email, @contact, @dob, @address, @faculty, @year, @semester)";
            int rowsAffected = await connection.ExecuteAsync(query, new
            {
                name = request.name,
                studentId = request.studentId,
                email = request.email,
                contact = request.contact,
                dob = request.dob,
                address = request.address,
                faculty = request.faculty,
                year = request.year,
                semester = request.semester,

            });
            return rowsAffected > 0;
        }
    }
}
