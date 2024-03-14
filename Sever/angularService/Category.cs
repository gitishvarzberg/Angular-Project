namespace angularService
{
    public class Category
    {
        public int Code { get; set; }
        public string Name { get; set; }    
        public string Icon { get; set; }

        public Category()
        { 
        }

        public Category(int code,string name,string icon)
        {
            Code = code;
            Name = name;
            Icon = icon;
        }
    }
}
