// src/components/SearchBar/SearchBarView.js
import React from "react";

export default function SearchBarView({
    isSearchMenuOpen,
    toggleSearchMenu,
    query,
    onQueryChange,
    results,
    loading,
    onSelect
}) {
    return (
        <div className="flex md:order-3 relative">
            <button
                type="button"
                onClick={toggleSearchMenu}
                aria-controls="navbar-search"
                aria-expanded={isSearchMenuOpen}
                className={`md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1 ${isSearchMenuOpen ? "hidden" : "block"
                    }`}
            >
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
                <span className="sr-only">Buscar</span>
            </button>

            <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                    <span className="sr-only">Search icon</span>
                </div>
                <input
                    type="text"
                    id="search-navbar"
                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Buscar..."
                    value={query}
                    onChange={e => onQueryChange(e.target.value)}
                />

                {results.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                        {loading ? (
                            <div className="p-3 text-center text-gray-500 dark:text-gray-400">
                                Cargando...
                            </div>
                        ) : (
                            <ul>
                                {results.map(result => (
                                    <li key={result.id}>
                                        <button
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            onClick={() => onSelect(result)}
                                        >
                                            <p className="font-medium">{result.name}</p>
                                            {result.categories && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {result.categories.join(", ")}
                                                </p>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>

            {/* botón menú móvil */}
            <button
                onClick={toggleSearchMenu}
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-search"
                aria-expanded={isSearchMenuOpen}
            >
                <span className="sr-only">Open main menu</span>
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h15M1 7h15M1 13h15"
                    />
                </svg>
            </button>

            {/* menú móvil desplegable */}
            <div
                className={`items-center justify-between ${isSearchMenuOpen ? "block" : "hidden"
                    } w-full md:hidden absolute top-full left-0 mt-1 z-10`}
                id="navbar-search"
            >
                <div className="relative mt-3 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="search-navbar-mobile"
                            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Buscar..."
                            value={query}
                            onChange={e => onQueryChange(e.target.value)}
                        />
                    </div>

                    {results.length > 0 && (
                        <div className="mt-2">
                            {loading ? (
                                <div className="p-2 text-center text-gray-500 dark:text-gray-400">
                                    Cargando...
                                </div>
                            ) : (
                                <ul className="border border-gray-200 dark:border-gray-700 rounded-lg">
                                    {results.map(result => (
                                        <li key={result.id}>
                                            <button
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                onClick={() => onSelect(result)}
                                            >
                                                <p className="font-medium">{result.name}</p>
                                                {result.categories && (
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {result.categories.join(", ")}
                                                    </p>
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
