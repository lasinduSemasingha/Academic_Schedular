namespace StudentBackendAPI.Entities
{
    public class ResourceEntity
    {
        public int sId { get; set; }
        public string name { get; set; } = string.Empty;
        public string studentId { get; set; } = string.Empty;
        public string email { get; set; }= string.Empty;
        public string contact { get; set; } = string.Empty;
        public DateTime dob { get; set; }
        public string address { get; set; }= string.Empty;  
        public string faculty { get; set;} = string.Empty;
        public string year { get; set;} = string.Empty;
        public string semester { get; set; } = string.Empty;
       
    }
}
