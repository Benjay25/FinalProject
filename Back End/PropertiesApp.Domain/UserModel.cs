using System;
using System.Collections.Generic;
using System.Dynamic;

namespace Properties.ViewModels
{
    public class UserModel
    {
        public UserModel()
        {
        }
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
