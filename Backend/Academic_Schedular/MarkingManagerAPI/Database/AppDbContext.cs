using MarkingManagerAPI.Entity;
using MarkingManagerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace MarkingManagerAPI.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<StudentMark> StudentMarks { get; set; }
        public DbSet<AnswerSheet> AnswerSheets { get; set; }
        public DbSet<Answer> Answers { get; set; }
    }
}
