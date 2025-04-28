namespace ExamBackendAPI.Entities
{
    public class Exam
    {
        public int examid { get; set; }
        public string examtype { get; set; }
        public string subject { get; set; }
        public DateTime datetime { get; set; }
        public int duration { get; set; }
        public string examhall {  get; set; }
        public string invigilator { get; set; }
        public int marks { get; set; }
        public string status { get; set; }
    }
}
