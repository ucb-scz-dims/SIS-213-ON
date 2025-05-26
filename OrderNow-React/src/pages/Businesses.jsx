import React, { useEffect, useState } from "react";
import TarjetaRestaurante from "../components/TarjetaRestaurante";
import { fetchBusinessesWithCategories, filterAndSortBusinesses } from "../services/businessesService";

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [businessCategories, setBusinessCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { businesses, categories, businessCategories } = await fetchBusinessesWithCategories();
        setBusinesses(businesses);
        setCategories(categories);
        setBusinessCategories(businessCategories);
      } catch (err) {
        console.error(err.message);
      }
    };
    loadData();
  }, []);

  const filteredBusinesses = filterAndSortBusinesses(businesses, businessCategories, selectedCategory);
  const visibleBusinesses = filteredBusinesses.filter((b) => b.is_open === isOpen);

  return (
    <div className="flex">
      <div className="fixed h-screen p-4 ml-10 mt-20">
        <div className="w-64 shadow-lg border-gray-300 rounded-xl p-4 h-fit border">
          <h2 className="text-2xl font-bold mb-4">Categorías</h2>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer ${selectedCategory === null ? "font-bold" : ""}`}
              onClick={() => setSelectedCategory(null)}
            >
              Todas
            </li>
            {categories.map((category) => (
              <li
                key={category.id}
                className={`text-gray-700 hover:text-black cursor-pointer ${selectedCategory === category.id ? "font-bold text-black" : ""
                  }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mr-auto" />
      <div>
        <div className="ml-4 flex items-center gap-4">
          <span className="underline cursor-pointer">Filtrar</span>
          <div
            className={`flex items-center rounded-full px-3 py-1 cursor-pointer ${isOpen ? "bg-green-300" : "bg-red-300"
              } shadow-md w-fit`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={`h-6 w-6 rounded-full border-2 bg-white transition-all duration-300 ${isOpen ? "translate-x-6" : "translate-x-0"
                }`}
            />
            <span className="ml-7 text-black font-medium">
              {isOpen ? "Abierto" : "Cerrado"}
            </span>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-1">
          {isOpen ? "Disponibles" : "No disponibles"}
        </h1>
        <h2 className="mb-5.5">
          {visibleBusinesses.length} restaurante
          {visibleBusinesses.length === 1 ? "" : "s"} {isOpen ? "disponible" : "no disponible"}
          {visibleBusinesses.length === 1 ? "" : "s"}
        </h2>

        {visibleBusinesses.map((item) => (
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
      <div className="mr-auto" />
    </div>
  );
};

export default Businesses;
