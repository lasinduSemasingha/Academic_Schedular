using ExamBackendAPI.Dto;
using ExamBackendAPI.Entities;  //ExamBackendAPI.Entities

namespace ExamBackendAPI.Services.Exam
{
    public interface IExamService
    {
        Task<bool> CreateExam(CreateExam request);
        Task<bool> UpdateExam(int id, UpdateExam request);
        Task<bool> DeleteExam(int id);
        Task<IEnumerable<ExamEntities>> GetAllExam();
        Task<ExamEntities> GetSingleExam(int id);
    }
}
