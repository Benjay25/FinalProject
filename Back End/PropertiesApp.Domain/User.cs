using System;
using System.Collections.Generic;
using System.Dynamic;

namespace PropertiesApp.Domain
{
    public class User
    {
        public User()
        {
        }
        public int Id { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string email { get; set; }
        public string password { get; set; }

    }
}
