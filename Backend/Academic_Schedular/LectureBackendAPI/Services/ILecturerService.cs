using LectureBackendAPI.Dto;

namespace LectureBackendAPI.Services
{
    public interface ILecturerService
    {
        Task<bool> CreateLecturer(CreateLecturer request);
    }
}
