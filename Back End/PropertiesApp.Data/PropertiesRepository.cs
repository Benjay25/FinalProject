using Entities;
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
        User CreateUser(User user);
        User UpdateUser(User user);
        void DeleteUser(int id);

        //----Adverts----
        Advert createAdvert(Advert ad);
        List<Advert> GetAdverts();
        Advert getAdvert(int id);
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
            //throw new NotImplementedException();
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
            //throw new NotImplementedException();
            return _ctx.Users.Find(id);
        }

        public List<User> GetUsers()
        {
            //throw new NotImplementedException();
            return _ctx.Users.ToList();
        }

        public User UpdateUser(User user)
        {
            throw new NotImplementedException();
        }

        //----------------------------- A D V E R T S -----------------------------------
        public Advert createAdvert(Advert ad)
        {
            //throw new NotImplementedException();
            _ctx.Adverts.Add(ad); 
            _ctx.SaveChanges();
            return ad;
        }

        public List<Advert> GetAdverts()
        {
            throw new NotImplementedException();
        }

        public Advert getAdvert(int id)
        {
            throw new NotImplementedException();
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
