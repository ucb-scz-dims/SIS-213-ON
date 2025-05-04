import React, { useEffect, useState } from 'react';
import TarjetaRestaurante from '../components/TarjetaRestaurante';
import getSupaBaseClient from '../supabase-client';

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [businessCategories, setBusinessCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const supaBaseCom = getSupaBaseClient('com');

  useEffect(() => {
    fetchData('businesses', (data) => {
      const ordered = data.sort((a, b) => b.is_open - a.is_open);
      setBusinesses(ordered);
    });
    fetchData('category', setCategories);
    fetchData('business_category', setBusinessCategories);
  }, []);
  
  const fetchData = async (table, setter) => {
    const { data, error } = await supaBaseCom
      .from(table)
      .select('*');
  
    if (error) {
      console.error(error.message);
      return;
    }
    setter(data);
  };

  const getWeight = (businessId) => {
    if (!selectedCategory) return 0;
    const rel = businessCategories.find(
      (bc) => bc.business_id === businessId && bc.category_id === selectedCategory
    );
    return rel ? rel.weight : 0;
  };

  const filteredBusinesses = selectedCategory
    ? businesses
      .filter((b) =>
        businessCategories.some(
          (bc) => bc.business_id === b.id && bc.category_id === selectedCategory
        )
      )
      .sort((a, b) => getWeight(b.id) - getWeight(a.id))
    : businesses;

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
            {categories.map((category) => (
              <li
                key={category.id}
                className={`text-gray-700 hover:text-black cursor-pointer ${selectedCategory === category.id ? 'font-bold text-black' : ''
                  }`}
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
        <h1 className="text-4xl font-bold mb-1">Disponibles</h1>
        <h2 className='mb-5.5'>
        {filteredBusinesses.filter(a => a.is_open).length} restaurante{filteredBusinesses.filter(a => a.is_open).length === 1 ? '' : 's'} disponible{filteredBusinesses.filter(a => a.is_open).length === 1 ? '' : 's'}
        </h2>
        {filteredBusinesses.some(r => r.is_open) && (
          filteredBusinesses.map((item) =>
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

        {filteredBusinesses.some(r => !r.is_open) && ( 
          <>
            <h1 className="text-4xl font-bold mb-1 mt-10">No disponibles</h1>
            <h2 className='mb-5.5'>
            {filteredBusinesses.filter(a => !a.is_open).length} restaurante{filteredBusinesses.filter(a => !a.is_open).length === 1 ? '' : 's'} no disponible{filteredBusinesses.filter(a => !a.is_open).length === 1 ? '' : 's'}
            </h2>
            {filteredBusinesses.map((item) =>
              !item.is_open && (
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
            )}
          </>
        )}
      </div>

      <div className='mr-auto '></div>
    </div>
  );
};

export default Businesses;
