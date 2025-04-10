import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getSupaBaseClient from '../supabase-client';
import ProductsList from '../components/ProductList';

function Business() {
  const { id } = useParams();
  const supaBaseCom = getSupaBaseClient('com');
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      const { data, error } = await supaBaseCom
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

        if (error) {
          console.error('Error al obtener el negocio:', error.message);
          alert('Error al obtener los datos del negocio.');
          setLoading(false);
          return;
        }
      setBusiness(data);
      setLoading(false);
    };

    fetchBusiness();
  }, [id, supaBaseCom]);

  if (loading) return <div className="pt-24 text-center">Cargando detalles...</div>;
  if (!business) return <div className="pt-24 text-center">No se encontró el negocio.</div>;

  const { name, description, address, is_open, open_time, close_time } = business;

  const timeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const openingMinutes = timeToMinutes(open_time);
  const closingMinutes = timeToMinutes(close_time);

  const withinOperatingHours = (currentMinutes >= openingMinutes) && (currentMinutes < closingMinutes);
  const isActuallyOpen = is_open && withinOperatingHours;

  return (
    <main className="max-w-6xl mx-auto px-4 pt-24 pb-8">
      {/* TODO: Se puede cambiar por un componente de advertencia */}
      {!isActuallyOpen && (
        <div className="bg-red-100 text-red-800 text-center py-3 font-semibold rounded mb-4">
          Este negocio está cerrado actualmente
        </div>
      )}

      <div
        className={`bg-white rounded-lg shadow-md p-6 mb-8 transition-all ${
          isActuallyOpen ? '' : 'opacity-50 grayscale'
        }`}
      >
        <div className="flex items-center gap-6">
          {/* Si cuentas con imagen, reemplaza este div */}
          <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
            {description && <p className="text-gray-600">{description}</p>}
            {address && <p className="text-gray-600">{address}</p>}
            <p className="text-sm text-gray-600">
              Horario: {open_time} - {close_time}
            </p>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Menu</h2>
        <ProductsList businessId={id} isMenuEnabled={isActuallyOpen} />
      </section>
    </main>
  );
}

export default Business;
