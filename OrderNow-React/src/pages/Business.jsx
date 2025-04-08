import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getSupaBaseClient from '../supabase-client';
import ProductsList from '../components/ProductList'; // Ajusta la ruta según tu estructura

function Business() {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const supaBaseCom = getSupaBaseClient('com');

  useEffect(() => {
    const fetchBusiness = async () => {
      const { data, error } = await supaBaseCom
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error al obtener el negocio:", error);
      } else {
        setBusiness(data);
      }
      setLoading(false);
    };

    fetchBusiness();
  }, [id, supaBaseCom]);

  if (loading) {
    return <p>Cargando detalles del restaurante...</p>;
  }

  if (!business) {
    return <p>No se encontró el negocio.</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 pt-24 pb-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{business.name}</h2>
            <p className="text-gray-600">{business.description}</p>
            {business.address && (
              <p className="text-sm text-gray-600">Dirección: {business.address}</p>
            )}
          </div>
        </div>
      </div>

      {/* Sección para mostrar los productos relacionados */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Productos del restaurante
        </h2>
        <ProductsList businessId={id} />
      </section>
    </main>
  );
}

export default Business;
