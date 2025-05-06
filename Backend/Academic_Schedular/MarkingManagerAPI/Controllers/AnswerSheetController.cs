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

            // Extract StudentId from filename (e.g., "12345_MidTerm.pdf" -> "12345")
            var fileNameWithoutExt = Path.GetFileNameWithoutExtension(file.FileName);
            var studentId = fileNameWithoutExt.Split('_').FirstOrDefault();

            if (string.IsNullOrWhiteSpace(studentId))
                return BadRequest("Invalid file name format. Cannot extract Student ID.");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");
            Directory.CreateDirectory(uploadsFolder);

            var savedFileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolder, savedFileName);

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

                var answerSheet = new AnswerSheet
                {
                    StudentId = studentId,
                    FileName = file.FileName,
                    UploadDate = DateTime.UtcNow
                };

                _context.AnswerSheets.Add(answerSheet);
                await _context.SaveChangesAsync();

                var answerEntities = answers.Select(a => new Answer
                {
                    AnswerSheetId = answerSheet.Id,
                    StudentId = studentId,
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

                    // Extract studentId from file name before extension
                    var studentId = Path.GetFileNameWithoutExtension(file.FileName);

                    var answerSheet = new AnswerSheet
                    {
                        FileName = file.FileName,
                        UploadDate = DateTime.UtcNow,
                        StudentId = studentId
                    };

                    _context.AnswerSheets.Add(answerSheet);
                    await _context.SaveChangesAsync();

                    var answerEntities = answers.Select(a => new Answer
                    {
                        AnswerSheetId = answerSheet.Id,
                        StudentId = studentId,
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


        [HttpPost("submit-marks")]
        public async Task<IActionResult> SubmitMarks([FromBody] MarkSubmissionDto submission)
        {
            if (submission == null || submission.Answers == null || !submission.Answers.Any())
                return BadRequest("No data submitted.");

            var answerSheet = await _context.AnswerSheets
                .FirstOrDefaultAsync(x => x.FileName == submission.FileName);

            if (answerSheet == null)
                return NotFound("AnswerSheet not found.");

            var marks = submission.Answers.Select(a => new StudentMark
            {
                StudentId = submission.StudentId,
                FileName = submission.FileName,
                Question = a.Question,
                Answer = a.Answer,
                Mark = a.Mark,
                DateScored = DateTime.UtcNow,
                AnswerSheetId = answerSheet.Id
            }).ToList();

            _context.StudentMarks.AddRange(marks);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Marks submitted successfully." });
        }

        [HttpPost("submit-marks-bulk")]
        public async Task<IActionResult> SubmitBulkMarks([FromBody] BulkMarkSubmissionDto bulkSubmission)
        {
            if (bulkSubmission?.Submissions == null || !bulkSubmission.Submissions.Any())
                return BadRequest("No submissions provided.");

            var allMarks = new List<StudentMark>();

            foreach (var submission in bulkSubmission.Submissions)
            {
                var answerSheet = await _context.AnswerSheets
                    .FirstOrDefaultAsync(x => x.FileName == submission.FileName);

                if (answerSheet == null)
                    continue;

                var marks = submission.Answers.Select(a => new StudentMark
                {
                    StudentId = submission.StudentId,
                    FileName = submission.FileName,
                    Question = a.Question,
                    Answer = a.Answer,
                    Mark = a.Mark,
                    DateScored = DateTime.UtcNow,
                    AnswerSheetId = answerSheet.Id
                });

                allMarks.AddRange(marks);
            }

            await _context.StudentMarks.AddRangeAsync(allMarks);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Bulk marks submitted successfully." });
        }

        [HttpGet("view-all")]
        public async Task<IActionResult> GetAllAnswerSheets()
        {
            var data = await _context.AnswerSheets
                .Include(a => a.Answers)
                .Include(a => a.StudentMarks)
                .Select(sheet => new
                {
                    sheet.Id,
                    sheet.FileName,
                    sheet.UploadDate,
                    Answers = sheet.Answers.Select(ans => new
                    {
                        ans.Question,
                        ans.AnswerText,
                        Mark = sheet.StudentMarks
                            .Where(m => m.Question == ans.Question)
                            .Select(m => m.Mark)
                            .FirstOrDefault()
                    }).ToList()
                })
                .ToListAsync();

            return Ok(data);
        }

        //[HttpGet("details/{answerSheetId}")]
        //public async Task<IActionResult> GetAnswerSheetDetails(int answerSheetId)
        //{
        //    var sheet = await _context.AnswerSheets
        //        .Include(a => a.Answers)
        //        .Include(a => a.StudentMarks)
        //        .Where(s => s.Id == answerSheetId)
        //        .Select(s => new
        //        {
        //            s.Id,
        //            s.StudentId,
        //            s.FileName,
        //            s.UploadDate,
        //            Answers = s.Answers.Select(a => new
        //            {
        //                a.Question,
        //                a.AnswerText,
        //                Mark = s.StudentMarks
        //                    .Where(m => m.Question == a.Question)
        //                    .Select(m => m.Mark)
        //                    .FirstOrDefault()
        //            })
        //        }).FirstOrDefaultAsync();

        //    if (sheet == null)
        //        return NotFound("Answer sheet not found.");

        //    return Ok(sheet);
        //}

        [HttpGet]
        public IActionResult GetExtractedAnswers()
        {
            return Ok(StoredAnswers);
        }

        [HttpGet("details/{fileName}")]
        public async Task<IActionResult> GetAnswerSheetDetails(string fileName, [FromQuery] string studentId)
        {
            var answerSheet = await _context.AnswerSheets
                .Where(sheet => sheet.StudentId == studentId && sheet.FileName == fileName)
                .Include(sheet => sheet.Answers)
                .FirstOrDefaultAsync();

            if (answerSheet == null)
                return NotFound("Answer sheet not found.");

            return Ok(answerSheet);
        }
    }
}
