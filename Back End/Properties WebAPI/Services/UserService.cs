using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Properties.ViewModels;
using PropertiesApp.Data;
using PropertiesApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        string AuthenticatePw(Password pw);
        IEnumerable<UserModel> GetAll();
        UserModel GetById(int id);
        UserModel Find(User user);
        void Add(User user);
        void UpdateUserDetails(int id, User user);
        void Unlock(int id);
        void Lock(int id);
        void UpdateSellerDetails(int id, User user);
        void UpdateUserPassword(Password password);
    }

    public class UserService : IUserService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications

        private readonly AppSettings _appSettings;
        private IPropertiesRepository _repo;

        public UserService(IOptions<AppSettings> appSettings, IPropertiesRepository repo)
        {
            this._repo = repo;
            this._appSettings = appSettings.Value;
        }

        

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _repo.GetUsers().SingleOrDefault(x => x.Email == model.Email && x.Password == model.Password);

            // return null if user not found
            if (user == null) return null;

            var userModel = Map(user);
            // authentication successful so generate jwt token
            var token = generateJwtToken(userModel);

            return new AuthenticateResponse(userModel, token);
        }
        public string AuthenticatePw(Password pw)
        {
            var user = _repo.GetUsers().SingleOrDefault(x => x.Id == pw.Id);

            // return null if user not found
            if (user.Password == pw.PW) 
                return "success";
            else return "";
        }
        //------------------------C R U D-------------------------
        public void Add(User user)
        {
            _repo.CreateUser(user);
        }
        public IEnumerable<UserModel> GetAll()
        {
            var userList = _repo.GetUsers();
            return userList.Select(u => Map(u));
        }

        public UserModel GetById(int id)
        {
            var userEntity = _repo.GetUser(id);
            if (userEntity == null) return null;

            return Map(userEntity);
        }
        
        public void UpdateUserDetails(int id, User user)
        {
            _repo.UpdateUserDetails(id, user);
        }

        public void Unlock(int id)
        {
            _repo.Unlock(id);
        }

        public void Lock(int id)
        {
            _repo.Lock(id);
        }

        public void UpdateSellerDetails(int id, User user)
        {
            _repo.UpdateSellerDetails(id, user);
        }

        public void UpdateUserPassword(Password password)
        {
            int id = password.Id;
            string pass = password.PW;
            _repo.UpdateUserPassword(id, pass);
        }
        // helper methods
        public UserModel Find(User user)
        {
            var userTemp = _repo.GetUserByEmail(user);
            return Map(userTemp);
        }
        private UserModel Map(User user)
        {
            return new UserModel
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Admin = user.Admin,
                Locked = user.Locked,
                PhoneNumber = user.PhoneNumber
            };
        }
        private string generateJwtToken(UserModel user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}