using System.ComponentModel.Design;
using ExamBackendAPI.Dto;
using ExamBackendAPI.Services.Exam;

namespace ExamBackendAPI.Endpoints.ExamEndPoint
{
    public static class ExamEndpoint
    {
        public static void MapExamEndpoint(this IEndpointRouteBuilder app)
        {
            // Map the endpoints for single resource creating
            app.MapPost("/exam", async (IExamService service, CreateExam request) =>
            {
                bool isExamCreated = await service.CreateExam(request);
                return isExamCreated
                    ? Results.Ok(new { isValid = true, message = "Exam Added successfully" })
                    : Results.NotFound(new {isValid=false, message ="Exam Adding Failed "});
            });

            // Map the endpoints for all exam getting
            app.MapGet("/exam", async (IExamService service) =>
            {
                var exam = await service.GetAllExam();
                return exam.Any()
                    ? Results.Ok(new { isValid = true, message = "Exam fetched Successfully", data = exam })
                    : Results.NotFound(new { isValid = false, message = "Exam fetching Failed" });
            });

            // Map the endpoints for single exam getting
            app.MapGet("/exam/{id}", async (IExamService service, int id) =>
            {
                var exam = await service.GetSingleExam(id);
                return exam != null
                    ? Results.Ok(new { isValid = true, message = "Exam fetched Successfully", data = exam })
                    : Results.NotFound(new { isValid = false, message = "Exam fetching Failed" });
            });

            // Map the endpoints for single resource updating
            app.MapPut("/exam/{id}", async (IExamService service, int id, UpdateExam request) =>
            {
                bool isExameUpdated = await service.UpdateExam(id, request);
                return isExameUpdated
                    ? Results.Ok(new { isValid = true, message = "Exam updated Successfully" })
                    : Results.NotFound(new { isValid = false, message = "Exam updating Failed" });
            });


            // Map the endpoints for single exam deleting
            app.MapDelete("/exam/{id}", async (IExamService service, int id) =>
            {
                bool isExamDeleted = await service.DeleteExam(id);
                return isExamDeleted
                    ? Results.Ok(new { isValid = true, message = "Exam deleted Successfully" })
                    : Results.NotFound(new { isValid = false, message = "Exam deleting Failed" });
            });


        }

    }
}
