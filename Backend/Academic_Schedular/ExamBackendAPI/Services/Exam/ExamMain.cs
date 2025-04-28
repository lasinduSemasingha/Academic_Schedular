using Dapper;
using ExamBackendAPI.Data;
using ExamBackendAPI.Dto;

namespace ExamBackendAPI.Services.Exam
{
    public class ExamMain : IExamService
    {
        private readonly ApplicationDbContext _context;

        public ExamMain(ApplicationDbContext context)
        {
            _context = context;
        }


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
    }
    
}
