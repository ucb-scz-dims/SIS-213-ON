import React, { useEffect, useState } from 'react';
import TarjetaRestaurante from '../components/TarjetaRestaurante';
import getSupaBaseClient from '../supabase-client';

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const supaBaseCom = getSupaBaseClient('com')

  useEffect(() => {
    fetchBusiness();
  }, []);

  const fetchBusiness = async () => {
    const { data, error } = await supaBaseCom
      .from('businesses')
      .select('*');

    if (error) {
      error.message;
      return;
    }

    const ordered = data.sort((a, b) => b.is_open - a.is_open);
    setBusinesses(ordered);

  };

  return (
    <div className="flex">
      <div className='mr-auto'></div>
      <div>
        <h1 className="text-4xl font-bold mb-1">Disponibles</h1>
        <h2 className='mb-5.5'>{businesses.filter(a => a.is_open).length} restaurantes disponibles</h2>
        {businesses.some(r => r.is_open) && (
          businesses.map((item) =>
            item.is_open && (
              <TarjetaRestaurante
                key={item.id}
                id={item.id}
                nombre={item.name}
                descripcion={item.description}
                estrellas={item.rating}
                minimum_order_amount={item.minimum_order_amount}
                delivery_time_min={item.delivery_time_min}
                delivery_time_max={item.delivery_time_max}
              />
            )
          )
        )}

        <h1 className="text-4xl font-bold mb-1">No disponibles</h1>
        <h2 className='mb-5.5'>{businesses.filter(a => !a.is_open).length} restaurantes disponibles</h2>
        {businesses.some(r => !r.is_open) && (
          businesses.map((item) =>
            !item.is_open && (
              <TarjetaRestaurante
                key={item.id}
                id={item.id}
                nombre={item.name}
                descripcion={item.description}
                estrellas={item.rating}
                comidas={[{ nombre: "comida 1", precio: "15" }]}
                minimum_order_amount={item.minimum_order_amount}
                delivery_time_min={item.delivery_time_min}
                delivery_time_max={item.delivery_time_max}
              />
            )
          )
        )}
      </div>
      <div className='mr-auto'></div>
      <div></div>
    </div>
    
  );

};

export default Businesses;
