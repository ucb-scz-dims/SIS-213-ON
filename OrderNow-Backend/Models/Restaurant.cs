namespace OrderNow_Backend.Models;

public class Restaurant
{
    public string Id { get; set; }
    public string Name { get; set; }
    public List<string> Category { get; set; } 
    public string Address { get; set; }
}