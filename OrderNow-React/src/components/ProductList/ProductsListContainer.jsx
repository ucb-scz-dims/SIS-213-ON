import React, { useState, useEffect } from 'react';
import getSupaBaseClient from '../../supabase-client';
import ProductsListView from './ProductsListView';

const ProductsListContainer = ({ businessId, isMenuEnabled, bestSellerIds = [] }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState('none');
    const supaBaseCom = getSupaBaseClient('com');

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supaBaseCom
                .from('products')
                .select('*')
                .eq('business_id', businessId);

            if (error) {
                console.error("Error al obtener los productos:", error);
            } else {
                setProducts(data);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [businessId, supaBaseCom]);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (a.available !== b.available) {
            return b.available - a.available;
        }

        if (sortOption === 'asc') return a.price - b.price;
        if (sortOption === 'desc') return b.price - a.price;
        return 0;
    });

    return (
        <ProductsListView
            products={sortedProducts}
            isMenuEnabled={isMenuEnabled}
            bestSellerIds={bestSellerIds}
            loading={loading}
            sortOption={sortOption}
            handleSortChange={handleSortChange}
        />
    );
};

export default ProductsListContainer;
