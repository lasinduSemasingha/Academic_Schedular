using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text.Json;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // React dev server
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("AllowFrontend");

// Upload PDFs for marking
app.MapPost("/upload-pdfs", async (HttpRequest request) =>
{
    var files = request.Form.Files;
    var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "AnswerSheets");

    if (!Directory.Exists(uploadPath))
        Directory.CreateDirectory(uploadPath);

    foreach (var file in files)
    {
        var filePath = Path.Combine(uploadPath, file.FileName);
        using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);
    }

    return Results.Ok("Files uploaded successfully.");
});

// Trigger marking
app.MapPost("/run-marking", async () =>
{
    var psi = new ProcessStartInfo
    {
        FileName = "python3", // or "python" on Windows
        Arguments = "PythonScripts/mark_answers.py",
        RedirectStandardOutput = true,
        UseShellExecute = false,
        CreateNoWindow = true
    };

    var process = Process.Start(psi);
    string result = await process.StandardOutput.ReadToEndAsync();
    process.WaitForExit();

    return Results.Ok("Marking completed.");
});

// Get results
app.MapGet("/marks", () =>
{
    var resultPath = Path.Combine("MarkedResults", "marks.json");
    if (!File.Exists(resultPath))
        return Results.NotFound("No results found.");

    var json = File.ReadAllText(resultPath);
    return Results.Json(JsonSerializer.Deserialize<object>(json));
});

// Generate question paper DOCX
app.MapPost("/generate-question-paper", async (HttpContext context) =>
{
    try
    {
        var requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();
        var jsonDoc = JsonDocument.Parse(requestBody);
        var questions = jsonDoc.RootElement.GetProperty("questions")
                         .EnumerateArray()
                         .Select(q => q.GetString())
                         .Where(q => !string.IsNullOrWhiteSpace(q))
                         .ToList();

        using var stream = new MemoryStream();
        using (var wordDoc = WordprocessingDocument.Create(stream, DocumentFormat.OpenXml.WordprocessingDocumentType.Document, true))
        {
            var mainPart = wordDoc.AddMainDocumentPart();
            mainPart.Document = new Document();
            var body = new Body();

            // Add student details placeholders
            body.Append(CreateParagraph("Student Name: "));
            body.Append(CreateParagraph("ID: "));
            body.Append(new Paragraph(new Run())); // empty line

            // Add questions
            for (int i = 0; i < questions.Count; i++)
            {
                string qText = $"Q{i + 1}: {questions[i]}";
                body.Append(CreateParagraph(qText));
                body.Append(new Paragraph(new Run())); // empty line after each question
            }

            mainPart.Document.Append(body);
            mainPart.Document.Save();
        }

        stream.Seek(0, SeekOrigin.Begin);
        context.Response.ContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        context.Response.Headers.Add("Content-Disposition", "attachment; filename=QuestionPaper.docx");
        await stream.CopyToAsync(context.Response.Body);
    }
    catch (Exception ex)
    {
        context.Response.StatusCode = 500;
        await context.Response.WriteAsync($"Error generating document: {ex.Message}");
    }
});

static Paragraph CreateParagraph(string text)
{
    return new Paragraph(new Run(new Text(text)));
}

app.Run();
