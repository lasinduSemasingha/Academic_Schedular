namespace LectureBackendAPI.Entities
{
    public class LecturerEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int PhoneNumber { get; set; } 
        public string Department { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        
    }
}
