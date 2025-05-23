﻿using AuthenticationAPI.Data;
using AuthenticationAPI.Entities;
using AuthenticationAPI.Dto;
using AuthenticationAPI.Utilities;
using Dapper;

namespace AuthenticationAPI.Services
{
    public class UserMain : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserMain(ApplicationDbContext context)
        {
            _context = context;
        }

        JwtTokenGenerator tokenObject = new JwtTokenGenerator();

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            using var connection = _context.Create();
            const string query = "SELECT id, username, first_name, last_name, email, password_hash, created_at, updated_at FROM Academic_Schedular_User;";
            return await connection.QueryAsync<User>(query);
        }
        public async Task<User?> GetUserByIdAsync(int id)
        {
            using var connection = _context.Create();
            const string query = "SELECT id, username, first_name, last_name, email, password_hash, created_at, updated_at FROM Academic_Schedular_User WHERE id = @id;";
            return await connection.QuerySingleOrDefaultAsync<User>(query, new { id });
        }
        public async Task<string?> AuthenticateUser(AuthenticationCredentials request)
        {
            try
            {
                var token = tokenObject.JwtToken(request.username);

                using var connection = _context.Create();

                const string query = "SELECT password_hash FROM Academic_Schedular_User WHERE username = @username;";

                string? storedHash = await connection.QuerySingleOrDefaultAsync<string>(query, new { request.username });

                if (storedHash == null || !PasswordHasherUtil.VerifyPassword(request.password, storedHash))
                {
                    return null;
                }

                return token;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<bool> CreateUser(CreateUser request)
        {
            using var connection = _context.Create();
            const string query = "INSERT INTO Academic_Schedular_User (username, first_name, last_name, email, password_hash, created_at, updated_at) VALUES (@username, @first_name, @last_name, @email, @password_hash, @created_at, @updated_at)";
            int rowsAffected = await connection.ExecuteAsync(query, new
            {
                username = request.username,
                first_name = request.first_name,
                last_name = request.last_name,
                email = request.email,
                password_hash = PasswordHasherUtil.HashPassword(request.password),
                created_at = DateTime.Now,
                updated_at = DateTime.Now

            });
            return rowsAffected > 0;
        }
    }
}
