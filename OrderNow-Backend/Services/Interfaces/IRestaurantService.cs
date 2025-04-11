using OrderNow_Backend.Models;

namespace OrderNow_Backend.Services.Interfaces;

public interface IRestaurantService
{
    Task IndexAsync(Restaurant restaurant);
    Task<IEnumerable<Restaurant>> SearchByNameAsync(string name);
    Task<IEnumerable<Restaurant>> SearchByCategoryAsync(string category);
}