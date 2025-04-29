namespace ExamBackendAPI.Dto
{
    public sealed record CreateExam( string examtype, string subject, DateTime datetime, int duration, string examhall, string invigilator, int marks, string status );

    public sealed record UpdateExam( string examtype, string subject, DateTime datetime, int duration, string examhall, string invigilator, int marks, string status);

}
