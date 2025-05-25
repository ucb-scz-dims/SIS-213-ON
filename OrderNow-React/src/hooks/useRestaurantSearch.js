import { useState, useEffect, useCallback } from "react";
import _ from "lodash";

export function useRestaurantSearch(repository, debounceMs = 300) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const debouncedSearch = useCallback(
        _.debounce(async q => {
            try {
                setLoading(true);
                const res = await repository.search(q);
                setResults(res);
                setError(null);
            } catch (e) {
                setResults([]);
                setError(e);
            } finally {
                setLoading(false);
            }
        }, debounceMs),
        [repository, debounceMs]
    );

    useEffect(() => {
        if (query) debouncedSearch(query);
        else setResults([]);
        return () => debouncedSearch.cancel();
    }, [query, debouncedSearch]);

    return { query, setQuery, results, loading, error };
}
