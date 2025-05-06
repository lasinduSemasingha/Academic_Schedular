namespace MarkingManagerAPI.Dto
{
    public class AnswerDto
    {
        public string Question { get; set; }
        public string Answer { get; set; }
    }

    public class AnswerSheetResult
    {
        public string FileName { get; set; }
        public List<AnswerDto> Answers { get; set; }
    }

    public class MarkSubmissionDto
    {
        public string StudentId { get; set; }
        public string FileName { get; set; }
        public List<AnswerMarkDto> Answers { get; set; }
    }

    public class AnswerMarkDto
    {
        public string Question { get; set; }
        public string Answer { get; set; }
        public int Mark { get; set; }
    }

    public class BulkMarkSubmissionDto
    {
        public List<MarkSubmissionDto> Submissions { get; set; } = new();
    }

}
