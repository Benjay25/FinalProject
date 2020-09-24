using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Properties.ViewModels;
using PropertiesApp.Data;
using PropertiesApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Helpers;

namespace Properties_WebAPI.Services
{
    public interface IAdvertService
    {
        void Add(Advert ad);
        void AddFavourite(int id, int userId);
        IEnumerable<AdvertModel> GetAll();
        IEnumerable<AdvertModel> GetAllAds();
        IEnumerable<AdvertModel> GetFavourites(int id);
        IEnumerable<AdvertModel> GetFilteredAdverts(Filter filters);
        AdvertModel GetById(int id);
        bool CheckFavourite(int id, int userId);
        void UpdateAdvert(Advert ad);
        void ToggleFeatured(int id);
        void DeleteAdvert(int id);
        LocationsModel GetLocations();
        void DeleteFavourite(int id, int userId);
        IEnumerable<AdvertModel> GetAdvertsByUserId(int id);
    }
    public class AdvertService : IAdvertService
    {
        private readonly AppSettings _appSettings;
        private IPropertiesRepository _repo;

        public AdvertService(IOptions<AppSettings> appSettings, IPropertiesRepository repo)
        {
            this._repo = repo;
            _appSettings = appSettings.Value;
        }

        //------------------------C R U D-------------------------
        public void Add(Advert ad)
        {
            _repo.CreateAdvert(ad);
        }
        
        public void AddFavourite(int id, int userId)
        {
            _repo.AddFavourite(id, userId);
        }
        public IEnumerable<AdvertModel> GetAll()
        {
            var adlist = _repo.GetAdverts();
            return adlist.Select(u => Map(u));
        }
        public IEnumerable<AdvertModel> GetAllAds()
        {
            var adlist = _repo.GetAllAdverts();
            return adlist.Select(u => Map(u));
        }

        public IEnumerable<AdvertModel> GetFavourites(int id)
        {
            var adList = _repo.GetFavourites(id);
            if (adList == null)
            {
                IEnumerable<AdvertModel> empty = null;
                return empty;
            }
            return adList.Select(u => Map(u));
        }

        public IEnumerable<AdvertModel> GetFilteredAdverts(Filter filters)
        {
            var adList = _repo.GetFilteredAdverts(filters);
            return adList.Select(u => Map(u));
        }
        public IEnumerable<AdvertModel> GetAdvertsByUserId(int id)
        {
            var adList = _repo.GetCurrentUserAdverts(id);
            return adList.Select(u => Map(u));
        }

        public AdvertModel GetById(int id)
        {
            var advertEntity = _repo.GetAdvert(id);
            if (advertEntity == null) return null;

            return Map(advertEntity);
        }

        public bool CheckFavourite(int id, int userId)
        {
            return _repo.CheckFavourite(id, userId);
        }
        public void UpdateAdvert(Advert ad)
        {
            _repo.UpdateAdvert(ad);
        }

        public void ToggleFeatured(int id)
        {
            _repo.ToggleFeatured(id);
        }
        public void DeleteAdvert(int id)
        {
            _repo.DeleteAdvert(id);
        }
        public void DeleteFavourite(int id, int userId)
        {
            _repo.DeleteFavourite(id, userId);
        }

        // Helper methods
        public AdvertModel Find(int id)
        {
            var advertTemp = _repo.GetAdvert(id);
            return Map(advertTemp);
        }
        private AdvertModel Map(Advert ad)
        {
            return new AdvertModel
            {
                Id = ad.Id,
                UserId = ad.UserId,
                Title = ad.Title,
                Province = ad.Province,
                City = ad.City,
                Details = ad.Details,
                Price = ad.Price,
                Status = ad.Status,
                Featured = ad.Featured
            };
        }

        public LocationsModel GetLocations() //TO BE REFACTORED SOON
        {
            var provinceList = new LocationsModel();
            return provinceList;
        }

    }
}
