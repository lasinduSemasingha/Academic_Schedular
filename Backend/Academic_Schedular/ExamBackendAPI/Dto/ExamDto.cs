namespace ExamBackendAPI.Dto
{
    public sealed record CreateExam(string examid, string examtype, string subject, DateTime datetime, int duration, string examhall, string invigilator, int marks, string status );

}
