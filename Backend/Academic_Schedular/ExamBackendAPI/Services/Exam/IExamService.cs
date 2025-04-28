using ExamBackendAPI.Dto;

namespace ExamBackendAPI.Services.Exam
{
    public interface IExamService
    {
        Task<bool> CreateExam(CreateExam request);
    }
}
