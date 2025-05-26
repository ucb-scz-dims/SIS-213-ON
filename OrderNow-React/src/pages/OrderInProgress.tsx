import React from 'react';
import { DeliveryTracker } from './../components/OrderInProgress/DeliveryTracker';
import { OrderStatus } from './../components/OrderInProgress/OrderStatus';
import { DeliveryInfo } from './../components/OrderInProgress/DeliveryInfo';
import { PaymentInfo } from './../components/OrderInProgress/PaymentInfo';
import { AddressInfo } from './../components/OrderInProgress/AddressInfo';
import { HelpButton } from './../components/OrderInProgress/HelpButton';

function OrderInProgress() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
        <DeliveryTracker 
          estimatedTime={{ start: "01:02", end: "01:12" }}
          progress={40}
          status="El repartidor ya está en el restaurante esperando tu pedido"
        />
        
        <OrderStatus 
          steps={[
            { 
              text: "El restaurante está preparando tu pedido",
              completed: true 
            },
            { 
              text: "Estamos procesando tu pedido", 
              completed: true 
            }
          ]} 
        />
        
        <DeliveryInfo 
          service="OrderNow"
        />
        
        <PaymentInfo 
          method="Pago Online"
          amount={1919}
        />
        
        <AddressInfo 
          address="Avenida de Libertad 123"
        />
        
        <div className="flex justify-center mt-8">
          <HelpButton />
        </div>
      </div>
    </div>
  );
}

export default OrderInProgress;
