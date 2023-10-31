using API.Data;
using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountController : BaseAPIController
    {
        private readonly DataContext _dataContext;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext dataContext, ITokenService tokenService)
        {
            _dataContext = dataContext;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegistrationDTO registrationDTO)
        {
            if (await IsUserExist(registrationDTO.userName))
            {
                return BadRequest("Username taken");
            }

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registrationDTO.userName,
                PasswordSalt = hmac.Key,

                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registrationDTO.password)),
                //PasswordSalt = hmac.Key
            };

            _dataContext.Users.Add(user);
            await _dataContext.SaveChangesAsync();

            return new UserDTO { 
            
                Username = registrationDTO.userName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            if (await IsUserExist(loginDTO.userName))
            {
                var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName.ToLower() == loginDTO.userName.ToLower());
                using var hmac = new HMACSHA512(user.PasswordSalt);

                var passhash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.password));

                for (int i = 0; i < passhash.Length; i++)
                {
                    if (user.PasswordHash[i] != passhash[i])
                    {
                        return Unauthorized("Invalid password");
                    }
                }
                return new UserDTO
                {
                    Username=loginDTO.userName,
                    Token = _tokenService.CreateToken(user)
                };

            }
            return Unauthorized("Invalid username");
        }

        private async Task<bool> IsUserExist(string username)
        {
            bool ret = true;

            ret = await _dataContext.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());

            return ret;
        }
    }
}
