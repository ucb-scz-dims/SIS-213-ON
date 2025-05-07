import React, { useState } from 'react';
import QuantitySelector from './atoms/QuantitySelector';
import Button from './atoms/Button';
import { useCartDispatch } from "../context/CartContext.jsx";
import { useCart } from "../context/CartContext";

const ProductDetailsModal = ({ product, closeModal }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);
  const [hasError, setHasError] = useState(false);
  const dispatch = useCartDispatch();

  const handleAccept = (e) => {
    e.stopPropagation();
    if (!hasError && !isNaN(parseInt(quantity, 10))) {
      const duplicate = cart != null ? cart.find((p) => p.id === product.id) : null;
      dispatch(
        duplicate
          ? {
              type: "changed",
              product: {
                ...duplicate,
                quantity: duplicate.quantity + quantity,
              },
            }
          : {
              type: "added",
              id: product.id,
              srcImage: product.image_url,
              title: product.name,
              description: product.description,
              price: product.price,
              quantity: quantity,
            }
      );
      closeModal();
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div 
        className="relative bg-white rounded-lg shadow-lg z-10 max-w-md w-full mx-4 p-6"
        onClick={handleModalClick}
      >
        <Button
          label="X"
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
          className="absolute top-1 right-3 !px-2 !py-1 bg-transparent !text-gray-600 hover:!text-gray-800 !border-0"
        />
        {product.image_url && product.image_url !== "NA" ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover mb-4 rounded"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 mb-4 rounded"></div>
        )}
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-lg font-bold text-gray-800 mb-4">Bs {product.price}</p>
        
        <div className="mb-4">
          <QuantitySelector 
            quantity={quantity} 
            setQuantity={setQuantity} 
            minQuantity={1} 
            maxQuantity={99}
            onErrorChange={setHasError}
          />
        </div>
        
        <div className="flex justify-center">
          <Button
            label="Aceptar"
            onClick={handleAccept}
            disabled={hasError}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
