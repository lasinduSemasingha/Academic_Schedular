using CoreSystemBackendAPI.Dto;

namespace CoreSystemBackendAPI.Services.Resources
{
    public interface IResourcesService
    {
        Task<bool> CreateResources(CreateResources request);
    }
}
