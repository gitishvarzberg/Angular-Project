using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace angularService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        public static List<Category> categories = new List<Category>()
        {
            new Category{Code=1,Icon="../assets/pizza.png",Name="לחמים"},
            new Category{Code=2,Icon="../assets/icon2.png",Name="מרקים"},
            new Category{Code=3,Icon="../assets/icon3.png",Name="עוגות"},
            new Category{Code=4,Icon="../assets/icon4.png",Name="סלטים"},
            new Category{Code=5,Icon="../assets/icon5.png",Name="בשרי"},
            new Category{Code=6,Icon="../assets/icon5.png",Name="חלבי"},

        };
        // GET: api/<CategoryController>
        [HttpGet]
        public List<Category> Get()
        {
            return categories;
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public Category Get(int code)
        {
            return categories.Find(x => x.Code == code);
        }

        // POST api/<CategoryController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
