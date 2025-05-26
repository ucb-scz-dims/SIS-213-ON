import React, { useState } from 'react';
import TarjetaRestaurante from '../components/TarjetaRestaurante';
import useSupabaseFetch from '../hooks/useSupabaseFetch';

const Businesses = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: businesses, loading: loadingBusinesses, error: errorBusinesses } = useSupabaseFetch(
    'businesses',
    {
      select: '*',
      filters: [],
      order: { column: 'is_open', ascending: false }
    }
  );
  const { data: categories, loading: loadingCategories, error: errorCategories } = useSupabaseFetch(
    'category',
    { select: '*', filters: [], order: null }
  );
  const { data: businessCategories, loading: loadingBC, error: errorBC } = useSupabaseFetch(
    'business_category',
    { select: '*', filters: [], order: null }
  );

  const getWeight = (businessId) => {
    if (!selectedCategory || !businessCategories) return 0;
    const rel = businessCategories.find(
      (bc) => bc.business_id === businessId && bc.category_id === selectedCategory
    );
    return rel ? rel.weight : 0;
  };

  const filteredBusinesses = selectedCategory && businesses && businessCategories
    ? businesses
        .filter((b) =>
          businessCategories.some(
            (bc) => bc.business_id === b.id && bc.category_id === selectedCategory
          )
        )
        .sort((a, b) => getWeight(b.id) - getWeight(a.id))
    : businesses || [];

  if (loadingBusinesses || loadingCategories || loadingBC) {
    return <div>Cargando...</div>;
  }
  if (errorBusinesses || errorCategories || errorBC) {
    return <div>Error al cargar los datos.</div>;
  }

  return (
    <div className="flex">
      <div className="fixed h-screen p-4 ml-10 mt-20">
        <div className="w-64 shadow-lg border-gray-300 rounded-xl p-4 h-fit border">
          <h2 className="text-2xl font-bold mb-4">Categorías</h2>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer ${selectedCategory === null ? 'font-bold' : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              Todas
            </li>
            {categories && categories.map((category) => (
              <li
                key={category.id}
                className={`text-gray-700 hover:text-black cursor-pointer ${selectedCategory === category.id ? 'font-bold text-black' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='mr-auto'></div>
      <div>
        <div className="ml-4 flex items-center gap-4">
          <span className="underline cursor-pointer">Filtrar</span>
          <div
            className={`flex items-center rounded-full px-3 py-1 cursor-pointer ${isOpen ? 'bg-green-300' : 'bg-red-300'} shadow-md w-fit`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={`h-6 w-6 rounded-full border-2 bg-white transition-all duration-300 ${isOpen ? 'translate-x-6' : 'translate-x-0'}`}
            ></div>
            <span className="ml-7 text-black font-medium">
              {isOpen ? 'Abierto' : 'Cerrado'}
            </span>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-1">
            {isOpen ? 'Disponibles' : 'No disponibles'}
          </h1>
          <h2 className="mb-5.5">
            {filteredBusinesses.filter(a => a.is_open === isOpen).length} restaurante{filteredBusinesses.filter(a => a.is_open === isOpen).length === 1 ? '' : 's'} {isOpen ? 'disponible' : 'no disponible'}{filteredBusinesses.filter(a => a.is_open === isOpen).length === 1 ? '' : 's'}
          </h2>
          {filteredBusinesses
            .filter((item) => item.is_open === isOpen)
            .map((item) => (
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
            ))}
        </div>
      </div>
      <div className='mr-auto '></div>
    </div>
  );
};

export default Businesses;
