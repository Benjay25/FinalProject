using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Properties.ViewModels;
using PropertiesApp.Data.Entities;
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
        void UpdateUserDetails(int id, User user);
        void UpdateSellerDetails(int id, User user);
        void UpdateUserPassword(int id, string password);
        void DeleteUser(int id);

        //----Adverts----
        Advert CreateAdvert(Advert ad);
        List<Advert> GetAdverts();
        List<Advert> GetFilteredAdverts(Filter filters);
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

        public void UpdateUserDetails(int id, User user)
        {
            var existing = _ctx.Users.SingleOrDefault(em => em.Id == id);
            if (existing != null)
            {
                existing.FirstName = user.FirstName;
                existing.LastName = user.LastName;
                existing.Email = user.Email;
                _ctx.Users.Update(existing);
                _ctx.SaveChanges();
            }
        }

        public void UpdateSellerDetails(int id, User user)
        {
            var existing = _ctx.Users.SingleOrDefault(em => em.Id == id);
            if (existing != null)
            {
                existing.FirstName = user.FirstName;
                existing.LastName = user.LastName;
                existing.Email = user.Email;
                existing.PhoneNumber = user.PhoneNumber;
                _ctx.Users.Update(existing);
                _ctx.SaveChanges();
            }
        }

        public void UpdateUserPassword(int id, string password)
        {
            var existing = _ctx.Users.SingleOrDefault(em => em.Id == id);
            if (existing != null)
            {
                existing.Password = password;
                _ctx.Users.Update(existing);
                _ctx.SaveChanges();
            }
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
            return _ctx.Adverts.Where(a => a.Status == "LIVE").ToList();
        }

        public List<Advert> GetFilteredAdverts(Filter filters)
        {
            IQueryable<Advert> ads;
            if (filters.Province != "") //My attempt to reduce the number of initial ads obtained by first query (not getting every ad, only some if possible)
            {
                ads = _ctx.Adverts.Where(a => a.Province == filters.Province && a.Status == "LIVE");
            } else
            {
                ads = _ctx.Adverts.Where(a => a.Status == "LIVE");
            }
            if (filters.Keywords != "") ads = ads.Where(a => a.Title.Contains(filters.Keywords) || a.Details.Contains(filters.Keywords));
            if (filters.City != "") ads = ads.Where(a => a.City == filters.City);
            if (filters.MaxPrice != 0) ads = ads.Where(a => a.Price <= filters.MaxPrice);
            if (filters.MinPrice != 0) ads = ads.Where(a => a.Price >= filters.MinPrice);
            if (filters.Order == "lth") ads = ads.OrderBy(s => s.Price);
            else if (filters.Order == "htl") ads = ads.OrderByDescending(s => s.Price);
            return ads.ToList();
        }

        public IEnumerable<Advert> GetCurrentUserAdverts(int id)
        {
            var ads = _ctx.Adverts.Where(a => a.UserId == id).ToList();
            return ads.Where(a => a.Status == "LIVE" || a.Status == "HIDDEN");
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
            var existing = _ctx.Adverts.SingleOrDefault(em => em.Id == id);
            if (existing != null)
            {
                existing.Status = "DELETED";
                _ctx.Adverts.Update(existing);
                _ctx.SaveChanges();
            }
        }
    }
}
