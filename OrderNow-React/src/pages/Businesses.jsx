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
    <div className="flex flex-col justify-center space-y-10">
      <div>
        <h1 className="text-4xl font-bold mb-6">Disponibles</h1>
        {businesses.some(r => r.is_open) && (
          businesses.map((item) =>
            item.is_open && (
              <TarjetaRestaurante
                key={item.id}
                id={item.id}
                nombre={item.name}
                descripcion={item.description}
                estrellas={3.5}
                minimum_order_amount={item.minimum_order_amount}
                comidas={[{ nombre: "comida 1", precio: "15" }]}
              />
            )
          )
        )}
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-6">No disponibles</h1>
        {businesses.some(r => !r.is_open) && (
          businesses.map((item) =>
            !item.is_open && (
              <TarjetaRestaurante
                key={item.id}
                id={item.id}
                nombre={item.name}
                descripcion={item.description}
                estrellas={3.5}
                minimum_order_amount={item.minimum_order_amount}
                comidas={[{ nombre: "comida 1", precio: "15" }]}
              />
            )
          )
        )}
      </div>
    </div>
  );

};

export default Businesses;
