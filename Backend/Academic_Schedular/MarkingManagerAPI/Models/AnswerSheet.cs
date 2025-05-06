namespace MarkingManagerAPI.Models
{
    public class AnswerSheet
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public DateTime UploadDate { get; set; }
        public List<Answer> Answers { get; set; }
    }
}
