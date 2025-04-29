namespace LectureBackendAPI.Dto
{
    public sealed record CreateLecturer(string name, string email, int phonenumber, string department, string description);
    public sealed record UpdateLecturer(string name, string email, int phonenumber, string department, string description);
}
