using PropertiesApp.Data;
using PropertiesApp.Domain;
using System;
using System.Linq;

namespace ConsoleApp
{
    internal class Program
    {
        private static UserContext context = new UserContext();

        private static void Main(string[] args)
        {
            context.Database.EnsureCreated();
            GetSamurais("Before Add:");
            AddSamurai();
            GetSamurais("After Add:");
            Console.Write("Press any key...");
            Console.ReadKey();
        }

        private static void AddSamurai()
        {
            var user = new User { firstname = "Samwise" };
            context.Users.Add(user);
            context.SaveChanges();
        }

        private static void GetSamurais(string text)
        {
            var users = context.Users.ToList();
            Console.WriteLine($"{text}: User count is {users.Count}");
            foreach (var user in users)
            {
                Console.WriteLine(user.firstname);
            }
        }
    }
}