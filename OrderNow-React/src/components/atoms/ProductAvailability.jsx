import React from 'react';

const ProductAvailability = ({ isAvailable }) => {
  return (
    <div
      className={`absolute top-2 right-2 px-2 py-1 rounded-md text-sm font-semibold ${isAvailable
          ? ''
          : 'bg-gray-100 text-gray-800'
        }`}
    >
      {isAvailable ? '' : 'Agotado'}
    </div>
  );
};

export default ProductAvailability;