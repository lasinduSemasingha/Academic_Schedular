namespace AuthenticationAPI.Dto
{
    public sealed record AuthenticationCredentials(string username, string password);
    public sealed record CreateUser(string first_name, string last_name, string email, string username, string password, DateTime createdAt, DateTime updatedAt);
}
