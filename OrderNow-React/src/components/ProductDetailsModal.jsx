import React, { useState } from "react";
import { useCartDispatch } from "../context/CartContext.jsx";
import { useCart } from "../context/CartContext";

const ProductDetailsModal = ({ product, closeModal }) => {
  const products = useCart();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useCartDispatch();

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAccept = () => {
    {
      if (products != null) {
        const existingProduct = products.find((p) => p.id === product.id);
        if (existingProduct) {
          dispatch({
            type: "changed",
            product: {
              ...existingProduct,
              quantity: existingProduct.quantity + quantity,
            },
          });
        } else {
          dispatch({
            type: "added",
            id: product.id,
            srcImage: product.image_url,
            title: product.name,
            description: product.description,
            price: product.price,
            quantity: quantity,
          });
        }
      } else {
        dispatch({
          type: "added",
          id: product.id,
          srcImage: product.image_url,
          title: product.name,
          description: product.description,
          price: product.price,
          quantity: quantity,
        });
      }
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div className="relative bg-white rounded-lg shadow-lg z-10 max-w-md w-full mx-4 p-6">
        <button
          onClick={closeModal}
          className="absolute top-1 right-3 text-gray-600 hover:text-gray-800"
        >
          X
        </button>
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
        <p className="text-lg font-bold text-gray-800 mb-4">
          Bs {product.price}
        </p>
        <div className="flex items-center justify-center mb-4">
          <button
            onClick={decrement}
            className="bg-gray-300 px-3 py-1 rounded-l hover:bg-gray-400"
          >
            -
          </button>
          <input
            type="text"
            readOnly
            value={quantity}
            className="w-12 text-center border-t border-b border-gray-300"
          />
          <button
            onClick={increment}
            className="bg-gray-300 px-3 py-1 rounded-r hover:bg-gray-400"
          >
            +
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleAccept}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
