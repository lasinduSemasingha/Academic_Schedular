using StudentBackendAPI.Dto;
using StudentBackendAPI.Entities;

namespace StudentBackendAPI.Services
{
    public interface IStudentService
    {
        Task<bool> CreateStudent(CreateStudent request);
        Task<bool> UpdateStudent(int id, UpdateStudent request);
        Task<bool> DeleteStudent(int id);       
        Task<IEnumerable<StudentEntity>> GetAllStudent();
        Task<StudentEntity> GetSingleStudent(int id);

    }
}
