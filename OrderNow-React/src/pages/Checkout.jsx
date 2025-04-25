import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Notification from "../components/Notification/Notification";
import EditSelect from "../components/EditSelect/EditSelect";
import OrderResume from "../components/OrderResume/OrderResume";

const Checkout = () => {
  const products = useCart();
  const navigate = useNavigate();

  const servicePrice = 0.5;
  const sendPrice = 4.5;
  const totalcarrito = products.reduce( (sum, { price, quantity }) => sum + price * quantity, 0);
  const totalPrice = (totalcarrito + sendPrice + servicePrice).toFixed(2) + " Bs.";

  const opcionesDireccion = ["Av. Palmar", "Universidad", "Postgrado"];
  const opcionesPago = ["Efectivo", "Tarjeta", "QR"];
  
  const[messageNoti, setMessageNoti] = useState("Tu pedido se ha realizado con exito");
  const[subMessageNoti, setSubMessageNoti] = useState("Puedes seguir comprando");
  const[successNoti, setSuccessNoti] = useState(true);
  const[fullNoti, setFullNoti] = useState(true);
  const[visibleNoti, setVisibleNoti] = useState(false);

  const [showResumen, setShowResumen] = useState(false);

  const goToBusiness = async () => {
    setVisibleNoti(true);
    setTimeout(() => {
      setVisibleNoti(false);
      navigate(`/restaurantes`);
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto mt-28 p-4 space-y-4 bg-white rounded-xl shadow-lg">
      <Notification message={messageNoti} subMessage={subMessageNoti} success={successNoti} full={fullNoti} visible={visibleNoti}/>
      <h2 className="text-lg font-bold text-center">Confirma tu pedido</h2>

      {/* Detalle de entrega */}
      <EditSelect name="Direccion de entrega" edit={false} options={opcionesDireccion}/>

      {/* Métodos de pago */}
      <EditSelect name="Metodo de pago" edit={false} options={opcionesPago} additionalText={totalPrice}/>

      {/* Sección de resumen */}
      <div className="bg-gray-100 rounded-lg p-4 space-y-2">
        <button className="w-full text-sm font-semibold text-gray-700 flex justify-between items-center"
          onClick={() => setShowResumen(!showResumen)} >
          <span>Resumen del pedido</span>
          <span className="text-lg">{showResumen ? "−" : "+"}</span>
        </button>
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
            <span> {totalPrice} Bs.</span>
          </div>
        </div>
      </div>

      {/* Botón de confirmación */}
      <button onClick={goToBusiness} className="w-full bg-[#ec135d] text-white py-3 rounded-full text-sm font-semibold shadow-md">
        Pedir {totalPrice}
      </button>
    </div>
  );
};

export default Checkout;
