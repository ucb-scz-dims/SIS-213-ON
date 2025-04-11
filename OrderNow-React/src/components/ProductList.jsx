import React, { useState, useEffect } from 'react';
import getSupaBaseClient from '../supabase-client';
import ProductCard from './ProductCard';

const ProductsList = ({ businessId, isMenuEnabled }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (!products || products.length === 0) {
    return <p>No hay productos para este restaurante.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} isMenuEnabled={isMenuEnabled} />
      ))}
    </div>
  );
};

export default ProductsList;
