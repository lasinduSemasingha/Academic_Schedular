using AuthenticationAPI.Entities;
using AuthenticationAPI.Dto;

namespace AuthenticationAPI.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User?> GetUserByIdAsync(int id);
        Task<string?> AuthenticateUser(AuthenticationCredentials request);
        Task<bool> CreateUser(CreateUser request);
    }
}
