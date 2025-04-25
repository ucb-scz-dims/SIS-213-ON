import React, { useEffect, useState } from 'react';
import TarjetaRestaurante from '../components/TarjetaRestaurante';
import getSupaBaseClient from '../supabase-client';

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const supaBaseCom = getSupaBaseClient('com')
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="ml-4 flex items-center gap-4">
      <span className="underline cursor-pointer">Filtrar</span>

      <div className={`flex items-center rounded-full px-3 py-1 cursor-pointer ${isOpen ? 'bg-green-400' : 'bg-red-400'} shadow-md w-fit`}
          onClick={() => setIsOpen(!isOpen)}
          >
            <div className={`h-6 w-6 rounded-full border-2 bg-white transition-all duration-300 ${isOpen ? 'translate-x-6' : 'translate-x-0'}`}>
            </div>
          <span className="ml-7 text-black font-medium">
            {isOpen ? 'Abierto' : 'Cerrado'}
          </span>
        </div>
      </div>

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
                estrellas={item.rating}
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
                estrellas={item.rating}
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
