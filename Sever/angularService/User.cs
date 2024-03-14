namespace angularService
{
    public class User
    {
        public int Code { get; set; }
        public string Name { get; set; }
        public string Adress { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public User() {}
      
        public User(int code,string name,string adrss ,string emil, string password)
        {
            Code = code;
            Name = name;
            Adress = adrss;
            Email = emil;
            Password = password;
        }
    } 
}
