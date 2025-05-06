namespace MarkingManagerAPI.Entity
{
    public class StudentMark
    {
        public int Id { get; set; }
        public string StudentId { get; set; }
        public string FileName { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public int Mark { get; set; }
        public DateTime DateScored { get; set; }
    }
}
