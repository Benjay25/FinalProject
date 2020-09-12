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
        IEnumerable<AdvertModel> GetAll();
        AdvertModel GetById(int id);
        void Add(Advert ad);
        void UpdateAdvert(Advert ad);
        Dictionary<string, List<string>> GetLocations();
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

        public Dictionary<string, List<string>> GetLocations()
        {
            Dictionary<string, List<string>> ProvinceList = new Dictionary<string, List<string>>();
            ProvinceList.Add("Northern Cape", new List<string>() { "Kimberley", "Upington" });
            ProvinceList.Add("Eastern Cape", new List<string>() { "Kimberley", "Upington" });
            ProvinceList.Add("Western Cape", new List<string>() { "Kimberley", "Upington" });
            ProvinceList.Add("Free State", new List<string>() { "Kimberley", "Upington" });
            ProvinceList.Add("Gauteng", new List<string>() { "Kimberley", "Upington" });
            return ProvinceList;
        }
    }
}
