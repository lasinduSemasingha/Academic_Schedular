using AuthenticationAPI.Dto;
using AuthenticationAPI.Services;

namespace AuthenticationAPI.Endpoints
{
    public static class UserEndpoint
    {
        public static void MapUserEndpoint(this IEndpointRouteBuilder app)
        {
            app.MapGet("/user", async (IUserService service) =>
            {
                var users = await service.GetUsersAsync();
                return Results.Ok(users);
            });

            app.MapGet("/user/{id}", async (IUserService service, int id) =>
            {
                var users = await service.GetUserByIdAsync(id);
                return users != null
                    ? Results.Ok(users)
                    : Results.NotFound($"Transaction with ID {id} not found.");
            });

            app.MapPost("/user/auth", async (IUserService service, AuthenticationCredentials request) =>
            {
                var token = await service.AuthenticateUser(request);

                if (token != null)
                {
                    return Results.Ok(new { message = true, token });
                }
                else
                {
                    return Results.NotFound($"Username or password incorrect");
                }
            });

            app.MapPost("/user", async (IUserService service, CreateUser request) =>
            {
                bool isUserCreated = await service.CreateUser(request);
                return isUserCreated
                    ? Results.Ok(new { message = true })
                    : Results.NotFound($"Transaction with username {request.username} not found.");
            });
        }

    }
}
