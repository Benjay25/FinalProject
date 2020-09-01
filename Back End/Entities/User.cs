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
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

    }
}
