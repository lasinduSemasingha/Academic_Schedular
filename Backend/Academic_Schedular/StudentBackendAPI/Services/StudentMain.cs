using System.Net;
using Dapper;
using StudentBackendAPI.Data;
using StudentBackendAPI.Dto;
using StudentBackendAPI.Entities;

namespace StudentBackendAPI.Services
{
    public class StudentMain : IStudentService
    {
        private readonly ApplicationDbContext _context;

        public StudentMain(ApplicationDbContext context)
        {
            _context = context;
        }

       //Data inserting endpoint
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

        //All Data Getting endpoint
        public async Task<IEnumerable<StudentEntity>> GetAllStudent()
        {
            //Database connection creating
            using var connection = _context.Create();
            const string query = "SELECT * FROM Academic_Schedular_Student";
            return await connection.QueryAsync<StudentEntity>(query);
        }

        //single data getting endpoint
        public async Task<StudentEntity> GetSingleStudent(int id)
        {
            //database connection creating
            using var connection = _context.Create();
            const string query = "SELECT * FROM Academic_Schedular_Student WHERE sId = @id";
            return await connection.QueryFirstOrDefaultAsync<StudentEntity>(query, new { id });
        }

        //single data updating endpoint
        public async Task<bool> UpdateStudent(int id, UpdateStudent request)
        {
            using var connection = _context.Create();
            const string query = "UPDATE Academic_Schedular_Student SET name = @name ,studentId = @studentId, email = @email , contact = @contact, dob = @dob, address = @address, faculty = @faculty, year = @year, semester = @semester WHERE sId = @id";
            int rowsAffected = await connection.ExecuteAsync(query, new
            {
                id,
                name = request.name,
                studentId = request.studentId,
                email = request.email,  
                contact = request.contact,
                dob = request.dob,
                address = request.address,
                faculty = request.faculty,
                year = request.year,
                semester =request.semester
            });
            return rowsAffected > 0;
        }

        //single data deleting endpoint
        public async Task<bool> DeleteStudent(int id)
        {
            using var connection = _context.Create();
            const string query = "DELETE FROM Academic_Schedular_Student WHERE sId = @id";
            int rowsAffected = await connection.ExecuteAsync(query, new { id });
            return rowsAffected > 0;
        }











    }
}
