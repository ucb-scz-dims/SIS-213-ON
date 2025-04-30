import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Notification from "../components/Notification/Notification";
import EditSelect from "../components/EditSelect/EditSelect";
import OrderResume from "../components/OrderResume/OrderResume";
import Button from "../components/atoms/Button";

const Checkout = () => {
  const products = useCart();
  const navigate = useNavigate();

  const servicePrice = 0.5;
  const sendPrice = 4.5;
  const totalcarrito = products.reduce( (sum, { price, quantity }) => sum + price * quantity, 0);

  const totalPrice = "Bs. " + (totalcarrito + sendPrice + servicePrice).toFixed(2);

  const opcionesDireccion = ["Av. Palmar", "Universidad", "Postgrado"];
  const opcionesPago = ["Efectivo", "Tarjeta", "QR"];
  
  const [notificationConfig, setNotificationConfig] = useState({
    message: "Tu pedido se ha realizado con exito",
    subMessage: "Puedes seguir comprando",
    success: true,
    full: true,
    visible: false
  });

  const [showResumen, setShowResumen] = useState(false);

  const goToBusiness = async () => {
    setNotificationConfig(prev => ({...prev, visible: true }));
    setTimeout(() => {
      setNotificationConfig(prev => ({...prev, visible: false }));
      navigate("/restaurantes");
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto mt-28 p-4 space-y-4 bg-white rounded-xl shadow-lg">
      <Notification {...notificationConfig}/>
      <h2 className="text-lg font-bold text-center">Confirma tu pedido</h2>

      {/* Detalle de entrega */}
      <EditSelect name="Direccion de entrega" edit={false} options={opcionesDireccion}/>

      {/* Métodos de pago */}
      <EditSelect name="Metodo de pago" edit={false} options={opcionesPago} additionalText={"➡️ " + totalPrice}/>

      {/* Sección de resumen */}
      <div className="bg-gray-100 rounded-lg p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span>Resumen del pedido</span>
          <Button onClick={() => setShowResumen(!showResumen)} type="button" label={showResumen ? "−" : "+"}/>
        </div>
        {showResumen? ( <OrderResume products={products}/> ) : (null)}
        
        {/* Desglose de precios */}
        <div className="text-sm space-y-1 pt-2 border-t border-gray-300">
          <div className="flex justify-between">
            <span>Productos</span>
            <span>{totalcarrito.toFixed(2)} Bs.</span>
          </div>
          <div className="flex justify-between">
            <span>Envío</span>
            <span>{sendPrice} Bs.</span>
          </div>
          <div className="flex justify-between">
            <span>Servicio</span>
            <span>{servicePrice} Bs.</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total</span> 
            <span>{totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Botón de confirmación */}
      <div className="flex justify-center mt-4">

        <Button onClick={goToBusiness} label={"Pedir " + totalPrice} type="button"/>
      </div>
    </div>
  );
};

export default Checkout;
