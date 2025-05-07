import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { useCart } from "../context/CartContext";
import { getUserId } from "../Supertokens";
import { CreateOrder } from "../SupaBase";
import { CreateOrderDetail } from "../SupaBase";
import { BussinessId } from "../SupaBase";
import { BussinessActive } from "../SupaBase";
import { ProductActive } from "../SupaBase";

import Notification from "../components/Notification/Notification";
import EditSelect from "../components/EditSelect/EditSelect";
import OrderResume from "../components/OrderResume/OrderResume";
import Button from "../components/atoms/Button";

const Checkout = () => {
  const products = useCart();
  const navigate = useNavigate();
  if(products.lenght<=0){
    window.alert("carrito vacio, selecciona productos.");
    navigate("/restaurantes")
    return null;
  }
  const servicePrice = 0.5;
  const sendPrice = 4.5;
  const totalcarrito = products.reduce( (sum, { price, quantity }) => sum + price * quantity, 0);
  const totalPrice = "Bs. " + (totalcarrito + sendPrice + servicePrice).toFixed(2);
  const [showResumen, setShowResumen] = useState(false);

  const opcionesDireccion = ["Av. Palmar", "Universidad", "Postgrado"];
  const opcionesPago = ["Efectivo", "Tarjeta", "QR"];
  const [direccion, setDireccion] = useState(opcionesDireccion[0]);
  const [metodoPago, setMetodoPago] = useState(opcionesPago[0]);

  const messageBase = () => {
    return {
      message: "Tu pedido se ha realizado con exito",
      subMessage: "Puedes seguir comprando",
      success: true,
      full: true,
      visible: false
    }
  }
  const [notificationConfig, setNotificationConfig] = useState(messageBase());
  const ShowNotification = () =>{
    setNotificationConfig(prev => ({...prev, visible: true }));
    setTimeout(() => {
      if(notificationConfig.success){navigate("/restaurantes");}
      setNotificationConfig(messageBase);
    }, 3000);
  }
  const validateData = async () => {
    if(products.lenght<=0){
      window.alert("carrito vacio, selecciona productos.");
      navigate("/restaurantes")
      return null;
    }
    let business_id = await BussinessId(products[0]?.id);
    if(business_id==null || business_id == undefined || await !BussinessActive(business_id)){
      window.alert("Restaurante no disponible, vuelve a editar tu carrito.");
      return null;
    }
    try{
      product.forEach(async element => {
        if(!await ProductActive(element.id)){
          window.alert(`Producto "${element.title}" no disponible actualmente, actualiza tu carrito.`);
          return null;
        }
        if(await BussinessId(element.id) != business_id){
          window.alert(`El Producto "${element.title}" no pertenece al mismo restaurante que tus demas productos, actualiza tu carrito.`);
          return null;
        }
      });
    }catch(e){
      window.alert("error obteniendo los productos de el carrito");
      return null;
    }
    return await getUserId();
  }
  const SendOrder = async () => {
    const response = validateData();
    if(response!=null){
      const orderId = CreateOrder(products[0].id, response, direccion,totalcarrito, metodoPago);
      if(orderId == null || orderId == undefined){
        setNotificationConfig(prev => ({
          ...prev, 
          message: "Error creando tu orden, revisa tu carrito y ordena nuevamente.",
          success: false,
          full: false
        }));
        ShowNotification();
        return null;
      }
      const orderDetail = CreateOrderDetail(orderId, products);
      if(orderDetail == false){
        setNotificationConfig(prev => ({
          ...prev, 
          message: "Algunos productos no se añadieron a tu orden",
          subMessage: "revisa tu orden y cancelala o mantenla depende a tu preferencia",
          success: false,
          full: true
        }));
      }
      ShowNotification();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-28 p-4 space-y-4 bg-white rounded-xl shadow-lg">
      <Notification {...notificationConfig}/>
      <h2 className="text-lg font-bold text-center">Confirma tu pedido</h2>

      {/* Detalle de entrega */}
      <EditSelect name="Direccion de entrega" edit={false} options={opcionesDireccion} value={direccion} onChange={setDireccion}/>

      {/* Métodos de pago */}
      <EditSelect name="Metodo de pago" edit={false} options={opcionesPago} additionalText={"➡️ " + totalPrice} value={metodoPago} onChange={setMetodoPago}/>

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

        <Button onClick={SendOrder} label={"Pedir " + totalPrice} type="button"/>
      </div>
    </div>
  );
};

export default Checkout;
