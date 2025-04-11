using Nest;
using OrderNow_Backend.Models;
using OrderNow_Backend.Services.Interfaces;

namespace OrderNow_Backend.Services.Implementations;

public class ElasticRestaurantService : IRestaurantService
{
    private readonly IElasticClient _elasticClient;

    public ElasticRestaurantService(IElasticClient elasticClient)
    {
        _elasticClient = elasticClient;
    }

    public async Task IndexAsync(Restaurant restaurant)
    {
        await _elasticClient.IndexDocumentAsync(restaurant);
    }
    
    public async Task<IEnumerable<Restaurant>> SearchByNameAsync(string name)
    {
        var response = await _elasticClient.SearchAsync<Restaurant>(s => s
            .Query(q => q
                .Bool(b => b
                    .Should(sh => sh
                            .Match(m => m
                                .Field(f => f.Name)
                                .Query(name)
                                .Fuzziness(Fuzziness.Auto)
                                .Boost(3)
                            ),
                        sh => sh.Prefix(p => p
                            .Field(f => f.Name)
                            .Value(name.ToLower())
                            .Boost(2) 
                        )
                    )
                    .MinimumShouldMatch(1)
                )
            )
            .Size(50)
        );

        if (!response.IsValid)
        {
            throw new Exception($"Error searching Elasticsearch: {response.DebugInformation}");
        }

        return response.Documents;
    }

    public async Task<IEnumerable<Restaurant>> SearchByCategoryAsync(string category)
    {
        var response = await _elasticClient.SearchAsync<Restaurant>(s => s
            .Query(q => q
                .Bool(b => b
                    .Should(sh => sh
                            .Match(m => m
                                .Field(f => f.Category)
                                .Query(category)
                                .Fuzziness(Fuzziness.Auto) 
                                .Boost(3)
                            ),
                        sh => sh.Prefix(p => p
                            .Field(f => f.Category)
                            .Value(category.ToLower()) 
                            .Boost(2)
                        )
                    )
                    .MinimumShouldMatch(1)
                )
            )
            .Size(50)
        );

        if (!response.IsValid)
        {
            throw new Exception($"Error searching Elasticsearch: {response.DebugInformation}");
        }

        return response.Documents;
    }


}