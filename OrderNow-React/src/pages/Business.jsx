import React, { useEffect, useState } from 'react';
import TarjetaRestaurante from '../components/TarjetaRestaurante';
import getSupaBaseClient from '../supabase-client';

const Business = () => {
  const [openRestaurants, setOpenRestaurants] = useState([]);
  const [closedRestaurants, setClosedRestaurants] = useState([]);
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
    const abiertos = data.filter(b => b.is_open);
    const cerrados = data.filter(b => !b.is_open);
    setOpenRestaurants(abiertos);
    setClosedRestaurants(cerrados);
  };

  return (
    <div className="flex flex-col justify-center space-y-10">
      <div>
        <h1 className="text-4xl font-bold mb-6">RESTAURANTES DISPONIBLES</h1>
        {openRestaurants.length > 0 && (
          openRestaurants.map((item) => (
            <TarjetaRestaurante
              key={item.id}
              id={item.id}
              nombre={item.name}
              descripcion={item.description}
              estrellas={3.5}
              comidas={[{ nombre: "comida 1", precio: "15" }]}
            />
          ))
        )}
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-6">RESTAURANTES NO DISPONIBLES</h1>
        {closedRestaurants.length > 0 && (
          closedRestaurants.map((item) => (
            <TarjetaRestaurante
              key={item.id}
              id={item.id}
              nombre={item.name}
              descripcion={item.description}
              estrellas={3.5}
              comidas={[{ nombre: "comida 1", precio: "15" }]}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Business;
