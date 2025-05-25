// src/repositories/ElasticRestaurantRepository.js
export class ElasticRestaurantRepository {
    constructor(baseUrl = "http://localhost:9200", index = "restaurants") {
        this.baseUrl = baseUrl;
        this.index = index;
    }

    async search(query) {
        if (!query.trim()) return [];
        const response = await fetch(
            `${this.baseUrl}/${this.index}/_search`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: {
                        multi_match: {
                            query,
                            fields: ["name", "categories"],
                            fuzziness: "AUTO"
                        }
                    }
                })
            }
        );
        if (!response.ok) throw new Error("Error en búsqueda");
        const data = await response.json();
        return data.hits.hits.map(hit => ({
            id: hit._id,
            ...hit._source,
            score: hit._score
        }));
    }
}
