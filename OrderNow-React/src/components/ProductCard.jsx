import React, { useState } from 'react';
import ProductDetailsModal from './ProductDetailsModal';

const ProductCard = ({ product, isMenuEnabled }) => {
  const [showModal, setShowModal] = useState(false);
  const handleCardClick = () => {
    if (isMenuEnabled) {
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
        className={`cursor-pointer bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-lg ${
          !isMenuEnabled ? 'opacity-50 grayscale cursor-not-allowed' : ''
        }`}
      >
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

      {showModal && (
        <ProductDetailsModal
          product={product}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default ProductCard;
