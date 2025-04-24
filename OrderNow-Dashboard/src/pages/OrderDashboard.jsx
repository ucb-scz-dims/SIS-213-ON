import React, { useEffect, useState } from "react";
import { getSupaBaseClient } from "../supabaseClient";
import { formatDate } from "../utils/formatDate";
import OrderDetail from '../components/order-detail/OrderDetail'
import getSupaBaseClient from "../supabase/supabase-client";
import { ORDER_STATUS } from "../config/order-status";
import ConfirmationModal from "../components/confirmation-modal/ConfirmationModal";

const supaBaseCom = getSupaBaseClient('com');

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);

  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const closeDetailModal = () => setDetailModalOpen(false);
  const closeConfirmationModal = () => setConfirmationModalOpen(false);

  const openDetailModal = (orderId) => {
    setSelectedOrderId(orderId);
    setDetailModalOpen(true);
  }

  const openConfirmationModal = (orderId, newStatusId) => {
    setSelectedOrderId(orderId);
    setConfirmAction(newStatusId);
    setConfirmationModalOpen(true);
  }

  const handleOrderStatusChange = async () => {

    if(!selectedOrderId || !confirmAction)
        return;

    const { error } = await supaBaseCom
      .from('orders')
      .update({ state_type_id: confirmAction})
      .eq('id', selectedOrderId)

    if(error) {
      alert("Error al actualizar el estado. Intentalo otra vez.");
      console.log(error.message);
      return;
    }

    closeConfirmationModal();
  }
   
  useEffect(() => {
    const fetchOrders = async () => {
      const { data: ordersData, error: ordersError } = await ordersupabase
        .from("orders")
        .select(`
          id,
          date,
          address,
          total_price,
          consumer_id,
          state_type_id,
          state_types ( name )
        `);

      const { data: consumerData, error: consumerError } = await ordersupabase
        .from("consumers")
        .select(`
          id,
          user_id
        `);

      const { data: usersData, error: usersError } = await usersupabase
          .from("users")
          .select(`
            id,
            name,
            last_name
            `);
      const { data: detailData, error: detailError } = await ordersupabase
          .from("order_details")
          .select(`
            id, 
            quantity,
            product_id,
            order_id
            `)
  
      if (ordersError || usersError || consumerError) {
        return console.error("Error fetching data:", ordersError || usersError);
      }
      
      const enrichedOrders = ordersData.map(order => {
        const consumer = consumerData.find(c => c.id === order.consumer_id);
        const user = consumer ? usersData.find(u => u.id === consumer.user_id) : null;
        
        return {
          ...order,
          consumer_name: user ? `${user.name} ${user.last_name}` : "Desconocido",
          status: order.state_types?.name || "Desconocido"
        };
      });     
  
      setOrders(enrichedOrders);

  
      setLoading(false);
    };
  
    fetchOrders();
  }, []);
  

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
                  <div className="w-24">{order.status}</div>

                  {/* TODO: Cambiar el parametro del la funcion "openConfirmationModal" por el verdadero Id cuando se consulte a la BD */}
                  {order.state_type_id == ORDER_STATUS.PENDING ? (<div className="w-24 flex space-x-2">
                    <button className="text-green-600 hover:underline" onClick={() => openConfirmationModal(order.id, ORDER_STATUS.ACCEPTED)}>
                      Aceptar
                    </button>
                    <button className="text-red-600 hover:underline" onClick={() => openConfirmationModal(order.id, ORDER_STATUS.CANCELED)}>
                      Rechazar
                    </button>
                  </div>) : ( <div className="w-24 flex space-x-2">
                    <button className="text-gray-400">
                      Aceptar
                    </button>
                    <button className="text-gray-400">
                      Rechazar
                    </button>
                  </div>)}

                  <div className="w-24 flex space-x-2">
                    <button className="text-gray-500 hover:underline" onClick={() => openDetailModal(order.id)}>
                      Ver detalle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isDetailModalOpen && selectedOrderId && (
        <OrderDetail 
          orderId={selectedOrderId} 
          onClose={closeDetailModal}
          onRequestAction={openConfirmationModal}
        />
      )}


      {isConfirmationModalOpen && selectedOrderId && (
        <ConfirmationModal
          title="Confirmar"
          message="Está seguro de realizar esta acción?"
          cancelText="Cancelar"
          confirmText="Confirmar"
          onClose={closeConfirmationModal}
          onConfirm={handleOrderStatusChange}
        />
      )

      }
    </>
  );
};

export default OrdersDashboard;
