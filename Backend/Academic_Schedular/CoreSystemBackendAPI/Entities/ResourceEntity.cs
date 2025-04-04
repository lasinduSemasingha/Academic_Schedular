using Azure.Core;

namespace CoreSystemBackendAPI.Entities
{
    public class ResourceEntity
    {
        public int RId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string RoomNo { get; set; } = string.Empty;
        public int Capacity { get; set; }
        public string AdditionalFacilities { get; set; } = string.Empty;
    }
}
