import React from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from './atoms/Rating';

const TarjetaRestaurante = ({ id, nombre, descripcion, estrellas, comidas, minimum_order_amount }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurante/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border border-gray-300 rounded-xl p-4 shadow-md flex flex-col md:flex-row cursor-pointer hover:shadow-lg transition-shadow mb-4"
    >
      <div className="flex items-center mb-4 md:mb-0 md:mr-4">
        <div className="bg-purple-600 rounded-full w-12 h-12 mr-4"></div>
        <div className="text-left">
          <h2 className="text-xl font-bold">{nombre}</h2>
          <p className="text-sm text-gray-500">{descripcion}</p>
          <Rating rating={estrellas || null} />
        </div>
      </div>
      
      <div className="overflow-x-auto whitespace-nowrap w-100 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 md:ml-2">
        <div className="flex space-x-4">
          {comidas.map((comida, index) => (
            <div key={index} className="flex flex-col items-center min-w-max">
              <div className="bg-black rounded-full w-12 h-12 mb-2"></div>
              <span className="text-sm font-medium">{comida.nombre}</span>
              <span className="text-xs text-gray-500">Precio: {comida.precio} Bs</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TarjetaRestaurante;
