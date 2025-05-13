import React from 'react';

const ProductAvailability = ({ isAvailable }) => {
  return (
    <div 
      className={`absolute top-2 right-2 px-2 py-1 rounded-md text-sm font-semibold ${
        isAvailable 
          ? 'bg-green-100 text-green-800' 
          : 'bg-gray-100 text-gray-800'
      }`}
    >
      {isAvailable ? 'Disponible' : 'Agotado'}
    </div>
  );
};

export default ProductAvailability;