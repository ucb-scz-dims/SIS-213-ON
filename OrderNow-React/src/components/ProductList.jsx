import React, { useState, useEffect } from 'react';
import getSupaBaseClient from '../supabase-client';
import ProductCard from './ProductCard';

const ProductsList = ({ businessId, isMenuEnabled }) => {
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
    if (sortOption === 'asc') return a.price - b.price;
    if (sortOption === 'desc') return b.price - a.price;
    return 0;
  });

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (!products || products.length === 0) {
    return <p>No hay productos para este restaurante.</p>;
  }

  return (
    <div>
      <div className="flex justify-end items-center gap-2 mb-4">
        
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="none">Ordenar por</option>
          <option value="asc">Precio: Menor a Mayor</option>
          <option value="desc">Precio: Mayor a Menor</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isMenuEnabled={isMenuEnabled}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
