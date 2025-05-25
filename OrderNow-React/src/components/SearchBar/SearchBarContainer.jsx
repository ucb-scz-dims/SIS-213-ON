// src/components/SearchBar/SearchBarContainer.js
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ElasticRestaurantRepository } from "../../repositories/ElasticRestaurantRepository";
import { useRestaurantSearch } from "../../hooks/useRestaurantSearch";
import SearchBarView from "./SearchBarView";

export default function SearchBarContainer() {
    const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);
    const repo = useMemo(() => new ElasticRestaurantRepository(), []);
    const { query, setQuery, results, loading } = useRestaurantSearch(repo);
    const navigate = useNavigate();

    const toggleSearchMenu = () => setIsSearchMenuOpen(open => !open);
    const handleSelect = restaurant => {
        navigate(`/product/${restaurant.id}`);
        setQuery("");
    };

    return (
        <SearchBarView
            isSearchMenuOpen={isSearchMenuOpen}
            toggleSearchMenu={toggleSearchMenu}
            query={query}
            onQueryChange={setQuery}
            results={results}
            loading={loading}
            onSelect={handleSelect}
        />
    );
}
