import React, { useEffect, useState } from "react";
import mockOrders from "../fakeData/mockOrders.json";
import { formatDate } from "../utils/formatDate";
import OrderDetail from '../components/order-detail/OrderDetail'
import getSupaBaseClient from "../supabase/supabase-client";

const supaBaseCom = getSupaBaseClient('com');

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  const handleOrderStatusChange = async (orderId, newStatusId) => {
    const { error } = await supaBaseCom
      .from('orders')
      .update({ state_type_id: newStatusId})
      .eq('id', orderId)

    if(error) {
      alert(error.message);
      return;
    }

    closeModal();
  }
   
  useEffect(() => {
    setOrders(mockOrders);
    setLoading(false);
  }, []);

  const getStatusText = (id) => {
    switch (id) {
      case 1:
        return "Pendiente";
      case 2:
        return "En camino";
      case 3:
        return "Entregado";
      case 4:
        return "Cancelado";
      default:
        return "Desconocido";
    }
  };

  return (
    <>
      <div className="min-h-screen p-6 md:p-12 font-sans">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Pedidos del Restaurante
          </h1>

          {loading ? (
            <p className="text-center text-gray-500">Cargando pedidos...</p>
          ) : (
            <div className="space-y-4">
              <div className="hidden md:grid grid-cols-10 bg-gray-100 text-gray-600 font-semibold px-8 py-3 shadow-sm text-sm">
                <span className="w-12">ID</span>
                <span className="w-28">Fecha</span>
                <span className="col-span-3">Dirección</span>
                <span className="w-28">Consumidor</span>
                <span className="w-20">Total</span>
                <span className="w-24">Estado</span>
                <span className="w-24">Confirmación</span>
                <span className="w-24">Detalles</span>
              </div>

              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-gray-200 py-4 px-5 rounded-1xl shadow hover:shadow-md transition-all duration-200 flex flex-col md:grid md:grid-cols-10 items-center gap-2 md:gap-4 text-sm"
                >
                  <div className="w-12 font-bold text-indigo-600">
                    #{order.id}
                  </div>
                  <div className="w-28">{formatDate(order.date)}</div>
                  <div className="col-span-3 truncate">{order.address}</div>
                  <div className="w-28">{order.consumer_name}</div>
                  <div className="w-20 font-medium text-green-700 text-right">
                    Bs. {order.total_price.toFixed(2)}
                  </div>
                  <div className="w-24">
                    {getStatusText(order.state_type_id)}
                  </div>
                  <div className="w-24 flex space-x-2">
                    <button className="text-green-600 hover:underline">
                      Aceptar
                    </button>
                    <button className="text-red-600 hover:underline">
                      Rechazar
                    </button>
                  </div>

                  <div className="w-24 flex space-x-2">
                    <button className="text-gray-500 hover:underline" onClick={openModal}>
                      Ver detalle
                    </button>
    
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <OrderDetail 
          orderId={1} 
          closeModal={closeModal}
          onStatusChange={handleOrderStatusChange}
        />
      )}
    </>
  );
};

export default OrdersDashboard;
