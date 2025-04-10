import Button from "../components/button/button";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const products = useCart();
  const navigate = useNavigate();

  const totalPrice = products.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0
  );

  const goToBusiness = () => {
    navigate(`/restaurantes`);
  };

  return (
    <div className="max-w-md mx-auto mt-28 p-4 space-y-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-lg font-bold text-center">Confirma tu pedido</h2>

      {/* Detalle de entrega */}
      <div className="bg-gray-100 rounded-lg p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">Detalle de entrega</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-800">Dirección</p>
            <p className="text-xs text-gray-500">Delivery 5-20 min</p>
          </div>
          <button className="text-blue-500 text-sm">Editar</button>
        </div>
      </div>

      {/* Métodos de pago */}
      <div className="bg-gray-100 rounded-lg p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">Método de pago</h3>
        <div className="flex justify-between">
          <p className="text-sm">Tigo Money</p>
          <p className="text-sm">Bs. {totalPrice.toFixed(2)}</p>
        </div>
        <button className="text-blue-500 text-sm">Agregar cupón</button>
      </div>

      {/* Resumen */}
      <div className="bg-gray-100 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Resumen</h3>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>Productos</span>
            <span>Bs. {totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Envío</span>
            <span>Bs. 4.50</span>
          </div>
          <div className="flex justify-between">
            <span>Servicio</span>
            <span>Bs. 0.50</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>Bs. {(totalPrice + 5).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Botón de confirmación */}
      <button
        onClick={goToBusiness}
        className="w-full bg-[#ec135d] text-white py-3 rounded-full text-sm font-semibold shadow-md"
      >
        Pedir (Bs. {(totalPrice + 5).toFixed(2)})
      </button>
    </div>
  );
};

export default Checkout;
