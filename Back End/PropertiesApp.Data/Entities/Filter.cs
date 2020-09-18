using System;
using System.Collections.Generic;
using System.Text;

namespace PropertiesApp.Data.Entities
{
    public class Filter
    {
        public Filter()
        {
        }
        public string Province { get; set; }
        public string City { get; set; }
        public decimal MinPrice { get; set; }
        public decimal MaxPrice { get; set; }
        public string Keywords { get; set; }
        public string Order { get; set; }
    }
}
