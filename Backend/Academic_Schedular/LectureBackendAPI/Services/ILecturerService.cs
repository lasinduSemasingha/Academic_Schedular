using LectureBackendAPI.Dto;
using LectureBackendAPI.Entities;

namespace LectureBackendAPI.Services.Lecturer
{
    public interface ILecturerService
    {
        Task<bool> CreateLecturer(CreateLecturer request);
        Task<bool> UpdateLecturer(int id, UpdateLecturer request);
        Task<bool> DeleteLecturer(int id);
        Task<IEnumerable<LecturerEntity>> GetAllLecturer();
        Task<LecturerEntity> GetSingleLecturer(int id);
    }
}
