using LectureBackendAPI.Dto;
using LectureBackendAPI.Services;

namespace LectureBackendAPI.Endpoints
{
    public static class LecturerEndpoints
    {
        public static void MapLecturerEndpoint(this IEndpointRouteBuilder app)
        {
          

            app.MapPost("/lecturer", async (ILecturerService service, CreateLecturer request) =>
            {
                bool isLecturerCreated = await service.CreateLecturer(request);
                return isLecturerCreated
                    ? Results.Ok(new {isValid = true, message = "Lecturer created Successfully"})
                    : Results.NotFound(new {isValid = false, message ="Lecturer creating failed"});
            });
        }

    }
}
