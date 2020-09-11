using Entities;
using Properties.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PropertiesApp.Data
{
    public interface IPropertiesRepository
    {
        User GetUser(int id);
        List<User> GetUsers();
        User GetUserByEmail(User user);
        User CreateUser(User user);
        User UpdateUser(User user);
        void DeleteUser(int id);

        //----Adverts----
        Advert createAdvert(Advert ad);
        List<Advert> GetAdverts();
        Advert GetAdvert(int id);
        Advert UpdateAdvert(Advert ad);
        void DeleteAdvert(int id);
    }
    public class PropertiesRepository : IPropertiesRepository
    {
        private PropertiesContext _ctx;
        public PropertiesRepository(PropertiesContext ctx)
        {
            _ctx = ctx;
        }
        //----------------------------- U S E R S -----------------------------------
        public User CreateUser(User user)
        {
            _ctx.Users.Add(user);
            _ctx.SaveChanges();
            return user;
        }

        public void DeleteUser(int id)
        {
            throw new NotImplementedException();
        }

        public User GetUser(int id)
        {
            return _ctx.Users.Find(id);
        }
        public User GetUserByEmail(User user)
        {
            var userTemp = _ctx.Users.FirstOrDefault(x => x.Email == user.Email);
            if (userTemp == null) return null;
            return userTemp;
        }
        public List<User> GetUsers()
        {
            return _ctx.Users.ToList();
        }

        public User UpdateUser(User user)
        {
            throw new NotImplementedException();
        }

        //----------------------------- A D V E R T S -----------------------------------
        public Advert createAdvert(Advert ad)
        {
            _ctx.Adverts.Add(ad); 
            _ctx.SaveChanges();
            return ad;
        }

        public List<Advert> GetAdverts()
        {
            return _ctx.Adverts.ToList();
        }

        public Advert GetAdvert(int id)
        {
            return _ctx.Adverts.Find(id);
        }

        public Advert UpdateAdvert(Advert ad)
        {
            throw new NotImplementedException();
        }

        public void DeleteAdvert(int id)
        {
            throw new NotImplementedException();
        }
    }
}
