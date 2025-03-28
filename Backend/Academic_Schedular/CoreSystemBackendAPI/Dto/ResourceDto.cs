namespace CoreSystemBackendAPI.Dto
{
    public sealed record CreateResources(string name, string location, string roomNo, int capacity, string additionalFacilities);
}
