using Azure.Core;

namespace ExamBackendAPI.Entities
{
    public class ExamEntities
    {
        public int EId { get; set; }
        public string Examtype { get; set; }
        public string Subject { get; set; }
        public DateTime Datetime { get; set; }
        public int Duration { get; set; }
        public string Examhall { get; set; }
        public string Invigilator { get; set; }
        public int Marks { get; set; }
        public string Status { get; set; }
    }
}
