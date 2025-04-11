import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Si el producto tiene imagen, se muestra; de lo contrario se muestra un placeholder */}
      {product.image_url ? (
        <img
          src={'product.image_url'}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="h-48 bg-gray-200"></div>
      )}
      <div className="p-4">
        <h3 className="font-semibold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <p className="text-lg font-bold text-gray-800">Bs {product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
