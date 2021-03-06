﻿using System;
using System.Collections.Generic;
using System.Dynamic;

namespace PropertiesApp.Data
{
    public class User
    {
        public User()
        {
        }
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public bool Admin { get; set; }
        public bool Locked { get; set; }

    }
}
