import React, { useState, useCallback } from 'react';
import SearchResults from '../SearchResults/SearchResults'

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const SearchBar = ({ isMobile = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchElasticsearch = async (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/restaurant/search-name?name=${term}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      if (data.length === 0) {
        setError('No se encontraron resultados.');
      } else {
        setSearchResults(data);
      }
    } catch (error) {
      console.error('Error al buscar en Elasticsearch:', error);
      setError('Ocurrió un error al buscar. Verifica tu conexión.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchResults = useCallback(
    debounce((value) => searchElasticsearch(value), 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedFetchResults(value);
  };

  const handleBlur = (e) => {
    setTimeout(() => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setSearchResults([]);
      }
    }, 200);
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Ícono de búsqueda</span>
          </div>
          <input
            type="text"
            id={isMobile ? "search-navbar-mobile" : "search-navbar"}
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar restaurantes..."
            value={searchTerm}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {loading && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
      </div>

      {searchResults.length > 0 || error ? (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg dark:bg-gray-800 max-h-60 overflow-auto">
          <SearchResults results={searchResults} error={error} />
        </div>
      ) : null}

      {searchResults.length > 0 && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {searchResults.length} resultados encontrados
        </div>
      )}
    </div>
  );
};

export default SearchBar;