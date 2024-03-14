using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace angularService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public static List<User> users = new List<User>()
        {
            new User{Code=111,Name="111",Adress="1",Email="1",Password="111"},
            new User{Code=222,Name="222",Adress="2",Email="2",Password="222"},
        };

        // GET: api/<UserController>
        [HttpGet]
        public List<User> Get()
        {
            return users;
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return  users.Find(x=>x.Code==id);
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] User user)
        {
            users.Add(user);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] User user)
        {
           User u=users.Find(x=>x.Code == id);
            if (u!=null)
            {
                u = user;
            }
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            User u = users.Find(x => x.Code == id);
            users.Remove(u);
        }
    }
}
