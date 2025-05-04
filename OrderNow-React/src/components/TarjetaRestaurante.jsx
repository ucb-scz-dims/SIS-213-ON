import React from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from './atoms/Rating';

const TarjetaRestaurante = ({ id, nombre, descripcion, estrellas, minimum_order_amount, delivery_time_min, delivery_time_max }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurante/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full sm:w-[22rem] md:w-[24rem] lg:w-[46rem] border border-gray-300 rounded-xl p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow mb-6 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-start sm:items-center space-x-4">
          <div className="bg-gray-300 rounded-sm w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0"></div>
          <div className="text-left flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{nombre}</h2>
            <p className="text-sm text-gray-500 line-clamp-2">{descripcion}</p>
            <div className="flex items-center space-x-4 mt-2">
            {minimum_order_amount && (
              <p className="text-sm text-gray-500">Min: Bs.{minimum_order_amount}</p>
            )}
            {delivery_time_min && delivery_time_max && (
              <p className="text-sm text-gray-500">⏱️ {delivery_time_min}-{delivery_time_max} min</p>
            )}
          </div>
          </div>
          
        </div>

        <div className="flex items-center space-x-1 flex-shrink-0">
          <Rating rating={estrellas || null} />
          
        </div>
      </div>

    </div>
  );
};

export default TarjetaRestaurante;
