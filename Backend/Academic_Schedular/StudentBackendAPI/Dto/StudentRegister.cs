namespace StudentBackendAPI.Dto
{
    public sealed record CreateStudent(string name, string studentId,string email,string contact,DateTime dob,string address,string faculty,string year,string semester);
}
