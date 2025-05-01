curl -X PUT "http://localhost:9200/restaurants" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0
  },
  "mappings": {
    "properties": {
      "name": {
        "type": "text"
      },
      "categories": {
        "type": "keyword"
      }
    }
  }
}'

echo "Índice 'restaurants' creado."

curl -X POST "http://localhost:9200/restaurants/_doc" -H 'Content-Type: application/json' -d'
{
  "name": "Aviator",
  "categories": ["Hamburguesas", "Pizza", "Alitas"]
}'

curl -X POST "http://localhost:9200/restaurants/_doc" -H 'Content-Type: application/json' -d'
{
  "name": "Pollos Campeón",
  "categories": ["Pollo", "Lasaña"]
}'

curl -X POST "http://localhost:9200/restaurants/_doc" -H 'Content-Type: application/json' -d'
{
  "name": "Burguer King",
  "categories": ["Hamburguesas", "Pollo", "Helados"]
}'

echo "Restaurantes de prueba creados."
