﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class Advert
    {
        public Advert()
        {
        }
        public int Id { get; set; }
        public string Email { get; set; }
        public string Title { get; set; }
        public string Province { get; set; }
        public string City { get; set; }
        public string Details { get; set; }
        public string Price { get; set; }
        public string Hidden { get; set; }
    }
}