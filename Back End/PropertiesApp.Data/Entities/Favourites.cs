using System;
using System.Collections.Generic;
using System.Text;

namespace PropertiesApp.Data.Entities
{
    public class Favourites
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int AdvertId { get; set; }
        public Favourites(int id, int userId)
        {
            UserId = userId;
            AdvertId = id;
        }
        public Favourites()
        {
        }
    }
}
