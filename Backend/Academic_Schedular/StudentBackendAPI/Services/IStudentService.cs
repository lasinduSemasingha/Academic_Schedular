using StudentBackendAPI.Dto;

namespace StudentBackendAPI.Services
{
    public interface IStudentService
    {
        Task<bool> CreateStudent(CreateStudent request);

    }
}
