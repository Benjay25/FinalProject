using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Properties.ViewModels;
using PropertiesApp.Data;
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
        IEnumerable<AdvertModel> GetAll();
        IEnumerable<AdvertModel> GetAdvertsOrdered(string order);
        AdvertModel GetById(int id);
        void UpdateAdvert(Advert ad);
        Dictionary<string, List<string>> GetLocations();
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
        
        public IEnumerable<AdvertModel> GetAll()
        {
            var adList = _repo.GetAdverts();
            return adList.Select(u => Map(u));
        }

        public IEnumerable<AdvertModel> GetAdvertsOrdered(string order)
        {
            var adList = _repo.GetAdvertsOrdered(order);
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
                Status = ad.Status
            };
        }

        public void UpdateAdvert(Advert ad)
        {
            _repo.UpdateAdvert(ad);
        }

        public Dictionary<string, List<string>> GetLocations() //TO BE REFACTORED
        {
            Dictionary<string, List<string>> ProvinceList = new Dictionary<string, List<string>>();
            ProvinceList.Add("Northern Cape", new List<string>() { "Kimberley", "Upington" });
            ProvinceList.Add("Eastern Cape", new List<string>()  { "Port Elizabeth", "East London" });
            ProvinceList.Add("Western Cape", new List<string>()  { "Kimberley", "Upington" });
            ProvinceList.Add("Free State", new List<string>()    { "Bloemfontein", "Welkom" });
            ProvinceList.Add("KwaZulu Natal", new List<string>() { "Durban", "Pietermaritzburg" });
            return ProvinceList;
        }
    }
}
