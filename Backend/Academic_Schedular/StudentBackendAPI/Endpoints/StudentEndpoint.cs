using StudentBackendAPI.Dto;
using StudentBackendAPI.Services;

namespace StudentBackendAPI.Endpoints
{
    public static class StudentEndpoint
    {
        public static void MapStudentEndpoint(this IEndpointRouteBuilder app)
        {
            

            app.MapPost("/student", async (IStudentService service, CreateStudent request) =>
            {
                bool isStudentCreated = await service.CreateStudent(request);
                return isStudentCreated
                    ? Results.Ok(new { isValid = true, message = "Student Registration Successfully" })
                    : Results.NotFound(new {isValid = false, message = "Student Registration Failed"});
            });
        }

    }
}
