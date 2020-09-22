using System;
using System.Collections.Generic;
using System.Text;

namespace PropertiesApp.Data
{
    public class Advert
    {
        public Advert()
        {
        }
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Province { get; set; }
        public string City { get; set; }
        public string Details { get; set; }
        public decimal Price { get; set; }
        public string Status { get; set; }
        public bool Featured { get; set; }
    }
}
