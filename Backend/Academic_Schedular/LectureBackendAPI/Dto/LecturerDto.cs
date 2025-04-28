namespace LectureBackendAPI.Dto
{
    public sealed record CreateLecturer(string name, string email, int phonenumber, string department, string description);
}
