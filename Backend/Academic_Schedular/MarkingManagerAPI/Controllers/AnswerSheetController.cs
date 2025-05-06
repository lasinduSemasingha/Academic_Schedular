using MarkingManagerAPI.Database;
using MarkingManagerAPI.Dto;
using MarkingManagerAPI.Entity;
using MarkingManagerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Text.Json;

namespace MarkingManagerAPI.Controllers
{
    [ApiController]
    [Route("api/answers")]
    public class AnswerSheetController : ControllerBase
    {
        private static List<AnswerDto> StoredAnswers = new();

        private readonly AppDbContext _context;

        public AnswerSheetController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadAnswerSheet(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");
            Directory.CreateDirectory(uploadsFolder);

            var filePath = Path.Combine(uploadsFolder, Guid.NewGuid() + Path.GetExtension(file.FileName));

            using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "python",
                    Arguments = $"PythonScripts/extract_answers.py \"{filePath}\"",
                    RedirectStandardOutput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };

            process.Start();
            var output = await process.StandardOutput.ReadToEndAsync();
            process.WaitForExit();

            try
            {
                var answers = JsonSerializer.Deserialize<List<AnswerDto>>(output, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (answers == null)
                    return BadRequest("Deserialization failed. Raw output: " + output);

                // Save to database
                var answerSheet = new AnswerSheet
                {
                    FileName = file.FileName,
                    UploadDate = DateTime.UtcNow
                };

                _context.AnswerSheets.Add(answerSheet);
                await _context.SaveChangesAsync();  // Save AnswerSheet first to get the Id

                var answerEntities = answers.Select(a => new Answer
                {
                    AnswerSheetId = answerSheet.Id,
                    Question = a.Question,
                    AnswerText = a.Answer
                }).ToList();

                _context.Answers.AddRange(answerEntities);
                await _context.SaveChangesAsync();

                return Ok(answers);
            }
            catch (JsonException ex)
            {
                return BadRequest($"JSON Deserialization error: {ex.Message}, Raw output: {output}");
            }
        }


        [HttpPost("upload-bulk")]
        public async Task<IActionResult> UploadBulkAnswerSheets(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("No files uploaded.");

            var results = new List<AnswerSheetResult>();
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");
            Directory.CreateDirectory(uploadPath);

            foreach (var file in files)
            {
                var filePath = Path.Combine(uploadPath, Guid.NewGuid() + Path.GetExtension(file.FileName));

                using (var stream = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }

                var process = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = "python",
                        Arguments = $"PythonScripts/extract_answers.py \"{filePath}\"",
                        RedirectStandardOutput = true,
                        UseShellExecute = false,
                        CreateNoWindow = true
                    }
                };

                process.Start();
                var output = await process.StandardOutput.ReadToEndAsync();
                process.WaitForExit();

                try
                {
                    var answers = JsonSerializer.Deserialize<List<AnswerDto>>(output, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    var answerSheet = new AnswerSheet
                    {
                        FileName = file.FileName,
                        UploadDate = DateTime.UtcNow
                    };

                    _context.AnswerSheets.Add(answerSheet);
                    await _context.SaveChangesAsync();  // Save AnswerSheet first to get the Id

                    var answerEntities = answers.Select(a => new Answer
                    {
                        AnswerSheetId = answerSheet.Id,
                        Question = a.Question,
                        AnswerText = a.Answer
                    }).ToList();

                    _context.Answers.AddRange(answerEntities);
                    await _context.SaveChangesAsync();

                    results.Add(new AnswerSheetResult
                    {
                        FileName = file.FileName,
                        Answers = answers ?? new List<AnswerDto>()
                    });
                }
                catch (Exception ex)
                {
                    results.Add(new AnswerSheetResult
                    {
                        FileName = file.FileName,
                        Answers = new List<AnswerDto> { new AnswerDto { Question = "Error", Answer = ex.Message } }
                    });
                }
            }

            return Ok(results);
        }



        [HttpGet]
        public IActionResult GetExtractedAnswers()
        {
            return Ok(StoredAnswers);
        }

        [HttpPost("submit-marks")]
        public async Task<IActionResult> SubmitMarks([FromBody] MarkSubmissionDto submission)
        {
            if (submission == null || submission.Answers == null || !submission.Answers.Any())
                return BadRequest("No data submitted.");

            var marks = submission.Answers.Select(a => new StudentMark
            {
                StudentId = submission.StudentId,
                FileName = submission.FileName,
                Question = a.Question,
                Answer = a.Answer,
                Mark = a.Mark,
                DateScored = DateTime.UtcNow
            }).ToList();

            _context.StudentMarks.AddRange(marks);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Marks submitted successfully." });
        }

        [HttpGet("view-all")]
        public async Task<IActionResult> GetAllAnswerSheets()
        {
            var data = await _context.StudentMarks
                .GroupBy(m => new { m.StudentId, m.FileName })
                .Select(g => new
                {
                    g.Key.StudentId,
                    g.Key.FileName,
                    Answers = g.Select(m => new
                    {
                        m.Question,
                        m.Answer,
                        m.Mark
                    }).ToList()
                })
                .ToListAsync();

            return Ok(data);
        }

        [HttpPost("submit-marks-bulk")]
        public async Task<IActionResult> SubmitBulkMarks([FromBody] BulkMarkSubmissionDto bulkSubmission)
        {
            if (bulkSubmission?.Submissions == null || !bulkSubmission.Submissions.Any())
                return BadRequest("No submissions provided.");

            var allMarks = new List<StudentMark>();

            foreach (var submission in bulkSubmission.Submissions)
            {
                if (submission.Answers == null || !submission.Answers.Any())
                    continue;

                var marks = submission.Answers.Select(a => new StudentMark
                {
                    StudentId = submission.StudentId,
                    FileName = submission.FileName,
                    Question = a.Question,
                    Answer = a.Answer,
                    Mark = a.Mark,
                    DateScored = DateTime.UtcNow
                });

                allMarks.AddRange(marks);
            }

            await _context.StudentMarks.AddRangeAsync(allMarks);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Bulk marks submitted successfully." });
        }


    }
}
