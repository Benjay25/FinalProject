using Properties.ViewModels;

namespace Properties.ViewModels
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool Admin { get; set; }
        public bool Locked { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(UserModel user, string token)
        {
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Email = user.Email;
            Admin = user.Admin;
            Locked = user.Locked;
            Token = token;
        }
    }
}