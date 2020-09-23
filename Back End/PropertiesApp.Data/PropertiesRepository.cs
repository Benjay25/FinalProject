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
        void AddFavourite(int id, int userId);
        List<Advert> GetAdverts();
        List<Advert> GetFavourites(int id);
        List<Advert> GetFilteredAdverts(Filter filters);
        Advert GetAdvert(int id);
        bool CheckFavourite(int id, int userId);
        void UpdateAdvert(Advert ad);
        void ToggleFeatured(int id);
        void DeleteAdvert(int id);
        void DeleteFavourite(int id, int userId);
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

        public void AddFavourite(int id, int userId)
        {
            var check = _ctx.FavouriteAdverts.Where(a => a.AdvertId == id && a.UserId == userId).ToList();
            if (check.Count() == 0)
            {
                var item = new Favourites(id, userId);
                _ctx.FavouriteAdverts.Add(item);
                _ctx.SaveChanges();
            }
            
        }

        public List<Advert> GetAdverts()
        {
            return _ctx.Adverts.Where(a => a.Status == "LIVE").ToList();
        }

        public List<Advert> GetFavourites(int id)
        {
            List<Favourites> adIdList = _ctx.FavouriteAdverts.Where(a => a.UserId == id).ToList();
            if (adIdList.Count() == 0) //If list is empty, return null
            {
                List<Advert> empty = null;
                return empty; 
            }

            List<Advert> adList = _ctx.Adverts.Where(a => a.Status == "LIVE" && a.Id == adIdList.ElementAt(0).AdvertId).ToList();
            for (int i=1; i < adIdList.Count(); i++)
            {
                adList.AddRange(_ctx.Adverts.Where(a => a.Status == "LIVE" && a.Id == adIdList.ElementAt(i).AdvertId).ToList());
            }
            return adList;
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

        public bool CheckFavourite(int id, int userId)
        {
            bool check = false;
            var entity = _ctx.FavouriteAdverts.Where(a => a.AdvertId == id && a.UserId == userId).ToList();
            if (entity.Count != 0)
                check = true;
            return check;
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

        public void ToggleFeatured(int id)
        {
            var existing = _ctx.Adverts.SingleOrDefault(em => em.Id == id);
            if (existing != null)
            {
                if (existing.Featured)
                    existing.Featured = false;
                else
                    existing.Featured = true;
                _ctx.Adverts.Update(existing);
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

        void IPropertiesRepository.DeleteFavourite(int id, int userId)
        {
            var entity = _ctx.FavouriteAdverts.SingleOrDefault(a => a.AdvertId == id && a.UserId == userId);
            if (entity != null)
            {
                _ctx.FavouriteAdverts.Remove(entity);
                _ctx.SaveChanges();
            }
            
        }
    }
}
