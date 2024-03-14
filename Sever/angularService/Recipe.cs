using System.Reflection.Emit;

namespace angularService
{
   //public  enum Level_of_difficulty
   // {
   //     One = 1,
   //     Two = 2,
   //     Three = 3,
   //     Four = 4,
   //     Five = 5
   // }
    public class Recipe
    {
        public int Code { get; set; }
        public string Name { get; set; } 
        public Category Category { get; set; } 
        public int Preparation_time { get; set; }
        public int Level_of_difficulty { get; set; }
        public DateTime Date_Add_Recipe { get; set; }
        public List<string> Products { get; set; }
        public List<string> Instructions { get; set; }
        public int Code_Chef { get; set; }
        public string Picture_Recipe { get; set; }

    }
}
