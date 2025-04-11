import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import EstadoPantalla from "../components/Respuesta-Estados/EstadoPantalla";

const Checkout = () => {
  const products = useCart();
  const navigate = useNavigate();

  const totalPrice = products.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0
  );

  const currentDirection = "Av. Palmar";
  const metodoPago = "Efectivo";
  const [stateMessage, setStateMessage] = useState(false);
  const [showResumen, setShowResumen] = useState(false);

  const goToBusiness = () => {
    setStateMessage(true);
    setTimeout(() => {
      setStateMessage(false);
      navigate(`/restaurantes`);
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto mt-28 p-4 space-y-4 bg-white rounded-xl shadow-lg">
      <EstadoPantalla visible={stateMessage} message="Pedido realizado con exito" subMessage="gracias" correct={true}/>
      <h2 className="text-lg font-bold text-center">Confirma tu pedido</h2>

      {/* Detalle de entrega */}
      <div className="bg-gray-100 rounded-lg p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">Detalle de entrega</h3>
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-800">
            Dirección: {currentDirection}
          </p>
          <button className="text-blue-500 text-sm">Editar</button>
        </div>
      </div>

      {/* Métodos de pago */}
      <div className="bg-gray-100 rounded-lg p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">Método de pago</h3>
        <div className="flex justify-between">
          <p className="text-sm">
            {metodoPago}: Bs. {totalPrice.toFixed(2)}
          </p>
          <button className="text-blue-500 text-sm">Editar</button>
        </div>
        <button className="text-blue-500 text-sm">Agregar cupón</button>
      </div>

      {/* Sección de resumen */}
      <div className="bg-gray-100 rounded-lg p-4 space-y-2">
        {/* Botón de cabecera para toggle de tabla */}
        <button
          className="w-full text-sm font-semibold text-gray-700 flex justify-between items-center"
          onClick={() => setShowResumen(!showResumen)}
        >
          <span>Resumen del pedido</span>
          <span className="text-lg">{showResumen ? "−" : "+"}</span>
        </button>

        {/* Tabla de productos */}
        {showResumen && (
          <div className="overflow-x-auto transition-all duration-300 ease-in-out mt-2">
            <table className="min-w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-gray-200 text-xs text-gray-600 uppercase tracking-wide">
                  <th className="px-3 py-2 text-left">Producto</th>
                  <th className="px-3 py-2 text-center">Cant.</th>
                  <th className="px-3 py-2 text-right">Precio Unit.</th>
                  <th className="px-3 py-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-200 last:border-none">
                    <td className="px-3 py-2">{product.title}</td>
                    <td className="px-3 py-2 text-center">{product.quantity}</td>
                    <td className="px-3 py-2 text-right">Bs. {product.price.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right">
                      Bs. {(product.price * product.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Desglose de precios (siempre visible) */}
        <div className="text-sm space-y-1 pt-2 border-t border-gray-300">
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
