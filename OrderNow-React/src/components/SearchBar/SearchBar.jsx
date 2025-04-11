import React, { useState } from 'react';

const SearchBar = ({ isMobile = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);

  const searchElasticsearch = async (term) => {
    if (!term.trim()) return [];

    try {
      const query = {
        bool: {
          should: [
            { wildcard: { nombre: { value: `*${term.toLowerCase()}*` } } },
            { wildcard: { categoria: { value: `*${term.toLowerCase()}*` } } },
            { wildcard: { direccion: { value: `*${term.toLowerCase()}*` } } }
          ],
          minimum_should_match: 1
        }
      };
      console.log(import.meta.env.VITE_ELASTICSEARCH_URL)

      const response = await fetch(import.meta.env.VITE_ELASTICSEARCH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          size: 10
        })
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data.hits.hits.map(hit => hit._source);
    } catch (error) {
      console.error('Error al buscar en Elasticsearch:', error);
      setError('Ocurrió un error al buscar. Verifica tu conexión.');
      return [];
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setError(null);

    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout);
    }

    window.searchTimeout = setTimeout(async () => {
      if (value.trim()) {
        setLoading(true);
        try {
          const results = await searchElasticsearch(value);
          setSearchResults(results);
          setShowResults(results.length > 0);
        } catch (error) {
          console.error('Error en la búsqueda:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 150);
  };

  const handleBlur = () => {
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Ícono de búsqueda</span>
          </div>
          <input
            type="text"
            id={isMobile ? "search-navbar-mobile" : "search-navbar"}
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar restaurantes..."
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => {
              if (searchResults.length > 0) setShowResults(true);
            }}
            onBlur={handleBlur}
          />
          {loading && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
      </div>

      {(showResults) || error ? (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg dark:bg-gray-800 max-h-60 overflow-auto">
          {error ? (
            <div className="px-4 py-3 text-sm text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300 border-b border-red-300 dark:border-red-700 rounded-md">
              <span>{error}</span>
            </div>
          ) : (
            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
              {searchResults.map((restaurant, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-500"></div>
                    <div>
                      <div className="font-medium">{restaurant.nombre}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                        <span>4.5 km</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {Array.isArray(restaurant.categoria) ? restaurant.categoria.join(", ") : restaurant.categoria}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;