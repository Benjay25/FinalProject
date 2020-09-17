using System;
using System.Collections.Generic;
using System.Text;

namespace Properties.ViewModels
{
    public class LocationsModel
    {
        public LocationsModel()
        {
            ProvinceList = new Dictionary<string, List<string>>();
            ProvinceList.Add("Northern Cape", new List<string>() { "Kimberley", "Upington" });
            ProvinceList.Add("Eastern Cape", new List<string>() { "Port Elizabeth", "East London" });
            ProvinceList.Add("Western Cape", new List<string>() { "Kimberley", "Upington" });
            ProvinceList.Add("Free State", new List<string>() { "Bloemfontein", "Welkom" });
            ProvinceList.Add("KwaZulu Natal", new List<string>() { "Durban", "Pietermaritzburg" });
        }
        
        public Dictionary<string, List<string>> ProvinceList { get; set; }
    }
    
}
