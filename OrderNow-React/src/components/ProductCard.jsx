import React, { useState } from 'react';
import ProductDetailsModal from './ProductDetailsModal';
import ProductAvailability from './atoms/ProductAvailability';

const ProductCard = ({ product, isMenuEnabled, isBestSeller }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    if (isMenuEnabled && product.available) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`relative bg-white rounded-lg shadow-md p-4 transition-all ${!isMenuEnabled || !product.available
            ? 'opacity-50 grayscale cursor-not-allowed'
            : 'cursor-pointer hover:shadow-lg'
          }`}
      >
        {isBestSeller && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full shadow-md z-10">
            Popular
          </div>
        )}

        <ProductAvailability isAvailable={product.available} />

        <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 overflow-hidden">
          {product.image_url && product.image_url !== 'NA' ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              {product.name}
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-sm font-bold font-semibold mt-2">${product.price.toFixed(2)}</p>
      </div>

      {showModal && product.available && (
        <ProductDetailsModal
          product={product}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default ProductCard;
