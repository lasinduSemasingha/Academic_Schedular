using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthenticationAPI.Utilities
{
    public class JwtTokenGenerator
    {
        private string GenerateJwtToken(string username)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            // Ensure the key is at least 32 bytes (256 bits)
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourVeryLongSecretKeyHere12345678901234567890123456789012"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "http://localhost:5145",
                audience: "http://localhost:5145",
                claims: claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string JwtToken(string username)
        {
            return GenerateJwtToken(username);
        }
    }
}
