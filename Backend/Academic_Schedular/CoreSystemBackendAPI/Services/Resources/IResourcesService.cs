using CoreSystemBackendAPI.Dto;
using CoreSystemBackendAPI.Entities;

namespace CoreSystemBackendAPI.Services.Resources
{
    public interface IResourcesService
    {
        Task<bool> CreateResources(CreateResources request);
        Task<bool> UpdateResources(int id, UpdateResources request);
        Task<bool> DeleteResources(int id);
        Task<IEnumerable<ResourceEntity>> GetAllResources();
        Task<ResourceEntity> GetSingleResources(int id);
    }
}
