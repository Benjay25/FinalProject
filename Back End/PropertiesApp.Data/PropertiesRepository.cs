using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        Advert CreateAdvert(Advert ad);
        List<Advert> GetAdverts(); 
        List<Advert> GetAdvertsOrdered(string order);
        Advert GetAdvert(int id);
        void UpdateAdvert(Advert ad);
        void DeleteAdvert(int id);
        IEnumerable<Advert> GetCurrentUserAdverts(int id);
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
        public Advert CreateAdvert(Advert ad)
        {
            _ctx.Adverts.Add(ad); 
            _ctx.SaveChanges();
            return ad;
        }

        public List<Advert> GetAdverts()
        {
            return _ctx.Adverts.ToList();
        }

        public List<Advert> GetAdvertsOrdered(string order)
        {
            if (order == "toLow")
                return _ctx.Adverts.OrderByDescending(s => s.Price).ToList();
            if (order == "toHigh")
                return _ctx.Adverts.OrderBy(s => s.Price).ToList();
            else
                return _ctx.Adverts.ToList();
        }

        public IEnumerable<Advert> GetCurrentUserAdverts(int id)
        {
            return _ctx.Adverts.Where(a => a.UserId == id).ToList();
        }

        public Advert GetAdvert(int id)
        {
            return _ctx.Adverts.Find(id);
        }

        public void UpdateAdvert(Advert ad)
        {
            var existing = _ctx.Adverts.SingleOrDefault(em => em.Id == ad.Id);
            if (existing != null) { 
                _ctx.Entry(existing).State = EntityState.Detached;
                _ctx.Adverts.Attach(ad);
                _ctx.Entry(ad).State = EntityState.Modified;
                _ctx.SaveChanges();
            }
        }

        public void DeleteAdvert(int id)
        {
            throw new NotImplementedException();
        }
    }
}
