import React, { useState, useEffect } from 'react';
import getSupaBaseClient from '../supabase-client'; // Asegúrate de la ruta correcta
import ProductCard from './ProductCard';

const ProductsList = ({ businessId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Obtenemos el cliente configurado para el schema 'com'
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
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
