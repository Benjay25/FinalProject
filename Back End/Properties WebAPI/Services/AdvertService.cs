using Entities;
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

        private AdvertModel Map(Advert ad)
        {
            return new AdvertModel
            {
                Id = ad.Id,
                Email = ad.Email,
                Title = ad.Title,
                Province = ad.Province,
                City = ad.City,
                Details = ad.Details,
                Price = ad.Price,
                Hidden = ad.Hidden
            };
        }
    }
}
