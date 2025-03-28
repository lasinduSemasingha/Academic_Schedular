using ExamBackendAPI.Dto;
using ExamBackendAPI.Services.Exam;

namespace ExamBackendAPI.Endpoints.ExamEndPoint
{
    public static class ExamEndpoint
    {
        public static void MapExamEndpoint(this IEndpointRouteBuilder app)
        {

            app.MapPost("/exam", async (IExamService service, CreateExam request) =>
            {
                bool isExamCreated = await service.CreateExam(request);
                return isExamCreated
                    ? Results.Ok(new { isValid = true, message = "Exam Added successfully" })
                    : Results.NotFound(new {isValid=false, message ="Exam Adding Failed "});
            });
        }

    }
}
