using CoreSystemBackendAPI.Dto;
using CoreSystemBackendAPI.Services.Resources;

namespace CoreSystemBackendAPI.Endpoints.Resources
{
    public static class ResourceEndpoint
    {
        public static void MapResourcesEndpoint(this IEndpointRouteBuilder app)
        {
            // Map the endpoints for single resource creating
            app.MapPost("/resource", async (IResourcesService service, CreateResources request) =>
            {
                bool isResourceCreated = await service.CreateResources(request);
                return isResourceCreated
                    ? Results.Ok(new { isValid = true, message = "Resource created Successfully" })
                    : Results.NotFound(new { isValid = false, message = "Resource creating Failed" });
            });

            // Map the endpoints for all resources getting
            app.MapGet("/resource", async (IResourcesService service) =>
            {
                var resources = await service.GetAllResources();
                return resources.Any()
                    ? Results.Ok(new { isValid = true, message = "Resource fetched Successfully", data = resources })
                    : Results.NotFound(new { isValid = false, message = "Resource fetching Failed" });
            });

            // Map the endpoints for single resource getting
            app.MapGet("/resource/{id}", async (IResourcesService service, int id) =>
            {
                var resource = await service.GetSingleResources(id);
                return resource != null
                    ? Results.Ok(new { isValid = true, message = "Resource fetched Successfully", data = resource })
                    : Results.NotFound(new { isValid = false, message = "Resource fetching Failed" });
            });

            // Map the endpoints for single resource updating
            app.MapPut("/resource/{id}", async (IResourcesService service, int id, UpdateResources request) =>
            {
                bool isResourceUpdated = await service.UpdateResources(id, request);
                return isResourceUpdated
                    ? Results.Ok(new { isValid = true, message = "Resource updated Successfully" })
                    : Results.NotFound(new { isValid = false, message = "Resource updating Failed" });
            });

            // Map the endpoints for single resource deleting
            app.MapDelete("/resource/{id}", async (IResourcesService service, int id) =>
            {
                bool isResourceDeleted = await service.DeleteResources(id);
                return isResourceDeleted
                    ? Results.Ok(new { isValid = true, message = "Resource deleted Successfully" })
                    : Results.NotFound(new { isValid = false, message = "Resource deleting Failed" });
            });
        }

    }
}
