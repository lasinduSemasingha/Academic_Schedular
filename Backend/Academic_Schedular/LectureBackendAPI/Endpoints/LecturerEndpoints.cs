using LectureBackendAPI.Dto;
using LectureBackendAPI.Services.Lecturer;

namespace LectureBackendAPI.Endpoints
{
    public static class LecturerEndpoints
    {
        public static void MapLecturerEndpoint(this IEndpointRouteBuilder app)
        {
          

            app.MapPost("/Lecturer", async (ILecturerService service, CreateLecturer request) =>
            {
                bool isLecturerCreated = await service.CreateLecturer(request);
                return isLecturerCreated
                    ? Results.Ok(new {isValid = true, message = "Lecturer created Successfully"})
                    : Results.NotFound(new {isValid = false, message ="Lecturer creating failed"});
            });

            //Map the endpoints for all lecturers getting
            app.MapGet("/Lecturer", async (ILecturerService service) =>
            {
                var Lecturer = await service.GetAllLecturer();
                return Lecturer.Any()
                    ? Results.Ok(new { isValid = true, message = "Lecturer added Successfully", data = Lecturer })
                    :Results.NotFound(new { isValid = false, message = "Lecturer failed to add" });
            });

            //Map the endpoints for single lecturer getting
            app.MapGet("/Lecturer/{id}", async (ILecturerService service, int id) =>
            {
                var Lecturer = await service.GetSingleLecturer(id);
                return Lecturer != null
                    ? Results.Ok(new { isValid = true, message = "Lecturer added Successfully", data = Lecturer })
                    : Results.NotFound(new { isValid = false, message = "Lecturer failed to add" });
            });

            //Map the endpoints for single lecturer updating
            app.MapPut("/Lecturer/{id}", async (ILecturerService service, int id, UpdateLecturer request) =>
            {
                 bool isLecturerUpdated = await service.UpdateLecturer(id, request);
                return isLecturerUpdated
                    ? Results.Ok(new { isValid = true, message = "Lecturer updated Successfully" })
                    : Results.NotFound(new { isValid = false, message = "Lecturer failed to update" });
            });

            //Map the endpoints for single lecturer deleting
            app.MapDelete("/Lecturer/{id}", async (ILecturerService service, int id) =>
            {
                bool isLecturerDeleted = await service.DeleteLecturer(id);
                return isLecturerDeleted
                    ? Results.Ok(new { isValid = true, message = "Lecturer deleted Successfully" })
                    : Results.NotFound(new { isValid = false, message = "Lecturer failed to delete" });
            });


        }

    }
}
