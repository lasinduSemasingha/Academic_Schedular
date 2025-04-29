namespace CoreSystemBackendAPI.Dto
{
    public sealed record CreateResources(string name, string location, string roomNo, int capacity, string additionalFacilities);
    public sealed record UpdateResources(string name, string location, string roomNo, int capacity, string additionalFacilities);
}
