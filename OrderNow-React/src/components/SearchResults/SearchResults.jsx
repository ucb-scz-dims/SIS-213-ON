const SearchResults = ({ results, error }) => {
    if (error) {
        return (
            <div className="px-4 py-3 text-sm text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300 border-b border-red-300 dark:border-red-700 rounded-md">
                <span>{error}</span>
            </div>
        );
    }

    return (
        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            {results.map((restaurant, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-500"></div>
                        <div>
                            <div className="font-medium">{restaurant.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                                <span>4.5 km</span>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {Array.isArray(restaurant.category) ? restaurant.category.join(", ") : restaurant.category}
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default SearchResults;