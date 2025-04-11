using Microsoft.AspNetCore.Mvc;
using OrderNow_Backend.Models;
using OrderNow_Backend.Services.Interfaces;

namespace OrderNow_Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RestaurantController : ControllerBase
{
    private readonly IRestaurantService _restaurantService;

    public RestaurantController(IRestaurantService restaurantService)
    {
        _restaurantService = restaurantService;
    }

    [HttpPost]
    public async Task<IActionResult> Index(Restaurant restaurant)
    {
        await _restaurantService.IndexAsync(restaurant);
        return Ok(new { message = "Restaurant indexed successfully" });
    }

    [HttpGet("search-name")]
    public async Task<ActionResult<IEnumerable<Restaurant>>> Search([FromQuery] string name)
    {
        var results = await _restaurantService.SearchByNameAsync(name);
        return Ok(results);
    }
    
    [HttpGet("search-category")]
    public async Task<ActionResult<IEnumerable<Restaurant>>> SearchByCategory([FromQuery] string category)
    {
        var results = await _restaurantService.SearchByCategoryAsync(category);
        return Ok(results);
    }
    
}
