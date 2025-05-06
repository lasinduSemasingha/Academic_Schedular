namespace MarkingManagerAPI.Models
{
    public class Answer
    {
        public int Id { get; set; }
        public int AnswerSheetId { get; set; }  // Foreign key to AnswerSheet
        public string Question { get; set; }
        public string AnswerText { get; set; }

        public AnswerSheet AnswerSheet { get; set; }  // Navigation property
    }
}
