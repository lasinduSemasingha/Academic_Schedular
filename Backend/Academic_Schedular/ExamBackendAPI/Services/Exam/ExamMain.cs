using Dapper;
using ExamBackendAPI.Data;
using ExamBackendAPI.Dto;
using ExamBackendAPI.Entities;

namespace ExamBackendAPI.Services.Exam
{
    public class ExamMain : IExamService
    {
        private readonly ApplicationDbContext _context;

        public ExamMain(ApplicationDbContext context)
        {
            _context = context;
        }

        // Data inserting endpoint
        public async Task<bool> CreateExam(CreateExam request)
        {
        //database connection creating
            using var connection = _context.Create();
            const string query = "INSERT INTO Academic_Schedular_Exam (examtype, subject, datetime, duration, examhall, invigilator, marks, status) VALUES (@examtype, @subject, @datetime, @duration, @examhall, @invigilator, @marks, @status)";
            int rowsAffected = await connection.ExecuteAsync(query, new
            {
                examtype = request.examtype,
                subject = request.subject,
                datetime = request.datetime,
                duration = request.duration,
                examhall = request.examhall,
                invigilator = request.invigilator,
                marks = request.marks,
                status = request.status
            });
            return rowsAffected > 0;
        }
        // All Data Getting endpoint
        public async Task<IEnumerable<ExamEntities>> GetAllExam()
        {
            //Database connection creating
            using var connection = _context.Create();
            const string query = "SELECT * FROM Academic_Schedular_Exam";
            return await connection.QueryAsync<ExamEntities>(query);
        }
        // Single Data Getting endpoint
        public async Task<ExamEntities> GetSingleExam(int id)
        {
            //Database connection creating
            using var connection = _context.Create();
            const string query = "SELECT * FROM Academic_Schedular_Exam WHERE eId = @id";
            return await connection.QueryFirstOrDefaultAsync<ExamEntities>(query, new { id });
        }
        // Single Data Updating endpoint
        public async Task<bool> UpdateExam(int id, UpdateExam request)
        {
            using var connection = _context.Create();
            const string query = "UPDATE Academic_Schedular_Exam SET examtype = @examtype, subject = @subject, datetime = @datetime, duration = @duration, examhall = @examhall, invigilator = @invigilator, marks = @marks, status = @status  WHERE eId = @id";
            int rowsAffected = await connection.ExecuteAsync(query, new
            {
                id,
                examtype = request.examtype,
                subject = request.subject,
                datetime = request.datetime,
                duration = request.duration,
                examhall = request.examhall,
                invigilator = request.invigilator,
                marks = request.marks,
                status = request.status
            });
            return rowsAffected > 0;
        }
        // Single Data Deleting endpoint
        public async Task<bool> DeleteExam(int id)
        {
            using var connection = _context.Create();
            const string query = "DELETE FROM Academic_Schedular_Exam WHERE eId = @id";
            int rowsAffected = await connection.ExecuteAsync(query, new { id });
            return rowsAffected > 0;
        }
    }
    
}
