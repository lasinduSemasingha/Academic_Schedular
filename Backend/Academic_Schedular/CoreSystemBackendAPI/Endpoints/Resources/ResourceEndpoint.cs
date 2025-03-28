using CoreSystemBackendAPI.Dto;
using CoreSystemBackendAPI.Services.Resources;

namespace CoreSystemBackendAPI.Endpoints.Resources
{
    public static class ResourceEndpoint
    {
        public static void MapResourcesEndpoint(this IEndpointRouteBuilder app)
        {
            app.MapPost("/resource", async (IResourcesService service, CreateResources request) =>
            {
                bool isResourceCreated = await service.CreateResources(request);
                return isResourceCreated
                    ? Results.Ok(new {isValid = true, message = "Resource created Successfully"})
                    : Results.NotFound(new {isValid = false, message = "Resource creating Failed"});
            });
        }

    }
}
