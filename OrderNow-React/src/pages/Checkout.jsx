import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useCart } from "../context/CartContext";
import { getUserId } from "../Supertokens";
import { CreateOrder, CreateOrderDetail, BussinessId, BussinessActive, ProductActive } from "../SupaBase";

import Notification from "../components/Notification/Notification";
import EditSelect from "../components/EditSelect/EditSelect";
import OrderResume from "../components/OrderResume/OrderResume";
import Button from "../components/atoms/Button";
import { MESSAGES, SUBMESSAGES, VALIDATIONS} from "../assets/constants";

const Checkout = () => {
  const navigate = useNavigate();
  const NOTIFICATION_BASE = {
    message: MESSAGES.pedido_exitoso,
    subMessage: SUBMESSAGES.pedido_exitoso,
    success: true,
    full: true,
    visible: false
  }
  const [notificationConfig, setNotificationConfig] = useState(NOTIFICATION_BASE);
  const EDIT_NOTIFICATION = (
    message=NOTIFICATION_BASE.message,
    subMessage=NOTIFICATION_BASE.subMessage,
    success=NOTIFICATION_BASE.success,
    full=NOTIFICATION_BASE.full,
  ) => {
    setNotificationConfig(prev => ({
      ...prev, 
      message: message,
      subMessage: subMessage,
      success: success,
      full: full
    }));
  }
  const ShowNotification = () =>{
    setNotificationConfig(prev => ({...prev, visible: true }));
    setTimeout(() => {
      if(notificationConfig.success){navigate("/restaurantes");}
      setNotificationConfig(messageBase);
    }, 3000);
  }
  const products = useCart();
  if(VALIDATIONS.ArrayVacio(products)){
    EDIT_NOTIFICATION(message=MESSAGES.no_card, success=false, full=false);
    ShowNotification();
    navigate("/restaurantes")
  };
  const servicePrice = 0.5;
  const sendPrice = 4.5;
  const totalcarrito = products.reduce( (sum, { price, quantity }) => sum + price * quantity, 0);
  const totalPrice = "Bs." + (totalcarrito + sendPrice + servicePrice).toFixed(2);
  const [showResumen, setShowResumen] = useState(false);

  const opcionesDireccion = ["Av. Palmar", "Universidad", "Postgrado"];
  const opcionesPago = ["Efectivo", "Tarjeta", "QR"];
  const [direccion, setDireccion] = useState(opcionesDireccion[0]);
  const [metodoPago, setMetodoPago] = useState(opcionesPago[0]);

  const validateData = async () => {
    try{
      if(VALIDATIONS.OutPutNotAcceptable(await getUserId())){return (false, MESSAGES.no_user);};  
      if(VALIDATIONS.ArrayVacio(products)){return (false, MESSAGES.no_card);};
      let business_id = await BussinessId(products[0]?.id);
      if(VALIDATIONS.OutPutNotAcceptable(business_id)){return (false, MESSAGES.no_bussiness);};
      product.forEach(async element => {
        if(VALIDATIONS.OutPutNotAcceptable(await ProductActive(element.id))){return (false, MESSAGES.product_unable);}
        if(VALIDATIONS.Equals(await BussinessId(element.id), business_id)){return (false, MESSAGES.product_different);}
      });
      return (true, business_id);
    }catch(e){
      console.log("error validando datos", e);
      return (false, "error no soportado en validacion de datos");
    }
  }
  const Send_Order = async () => {
    const response = await validateData();
    if(!response[0]){
      EDIT_NOTIFICATION(message=response[1], success=false, full=false);
    }else{
      const orderId = await CreateOrder(response[1], await getUserId(), direccion,totalcarrito, metodoPago);
      if(VALIDATIONS.OutPutNotAcceptable(orderId)){ EDIT_NOTIFICATION(message=MESSAGES.order_error, success=false, full=false);}    
      else{
        const orderDetail = await CreateOrderDetail(orderId, products);
        if(VALIDATIONS.OutPutNotAcceptable(orderDetail)){ EDIT_NOTIFICATION(message=MESSAGES.order_detail_error, subMessage=SUBMESSAGES.order_detail_error, success=false, full=false);}
      }
    }
    ShowNotification();
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
            <span>Bs. {totalcarrito.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Envío</span>
            <span>Bs. {sendPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Servicio</span>
            <span>Bs. {servicePrice}</span>
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

        <Button onClick={Send_Order} label={"Pedir " + totalPrice} type="button"/>
      </div>
    </div>
  );
};

export default Checkout;
