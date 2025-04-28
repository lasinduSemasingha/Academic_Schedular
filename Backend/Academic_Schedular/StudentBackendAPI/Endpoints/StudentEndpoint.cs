using System.ComponentModel.Design;
using StudentBackendAPI.Dto;
using StudentBackendAPI.Services;

namespace StudentBackendAPI.Endpoints
{
    public static class StudentEndpoint
    {
        public static void MapStudentEndpoint(this IEndpointRouteBuilder app)
        {

            //Map the endpoints for single student creating
            app.MapPost("/student", async (IStudentService service, CreateStudent request) =>
            {
                bool isStudentCreated = await service.CreateStudent(request);
                return isStudentCreated
                    ? Results.Ok(new { isValid = true, message = "Student Registration Successfully" })
                    : Results.NotFound(new { isValid = false, message = "Student Registration Failed" });
            });

            //Map the endpoints for all student getting
            app.MapGet("/student", async (IStudentService service) =>
            {
                var student = await service.GetAllStudent();
                return student.Any()
                   ? Results.Ok(new { isValid = true, message = "Student fetched Successfully", data = student })
                   : Results.NotFound(new { isValid = false, message = "Student fetching failed" });
            });

            //Map the endpoints for single student getting
            app.MapGet("/student/{id}", async (IStudentService service, int id) =>
            {
                var student = await service.GetSingleStudent(id);
                return student != null
                ? Results.Ok(new { isValid = true, message = "Student details fetching Successfully", data = student })
                : Results.NotFound(new { isValid = false, message = "Student fetching failed" });
            });

            //Map the endpoints for single student updating
            app.MapPut("/student/{id}", async (IStudentService service, int id, UpdateStudent request) =>
            {
                bool isResourceUpdated = await service.UpdateStudent(id, request);
                return isResourceUpdated
                ? Results.Ok(new { isValid = true, message = "Student details updated successfully" })
                : Results.NotFound(new { isValid = false, message = "Student updating failed" });
            });

            //Map the endpoints for single student deleting
            app.MapDelete("/student/{id}", async(IStudentService service, int id) =>
            {
                bool isResourceDeleted = await service.DeleteStudent(id);
                return isResourceDeleted
                ? Results.Ok(new { isValid = true, message = "Student details deleted Successfully" })
                : Results.NotFound(new { isValid = false, message = "Student deleting failed" });
            });

        


        }

    }
}
