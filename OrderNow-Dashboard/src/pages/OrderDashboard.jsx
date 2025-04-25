import React, { useEffect, useState } from "react";
import { formatDate } from "../utils/formatDate";
import OrderDetail from "../components/order-detail/OrderDetail";
import getSupaBaseClient from "../supabase/supabase-client";
import { ORDER_STATUS } from "../config/order-status";
import ConfirmationModal from "../components/confirmation-modal/ConfirmationModal";
import Button from "../components/Button/Button";

const supaBase = getSupaBaseClient();

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);

  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [titleConfirmationModal, setTitleConfirmationModal] = useState("");
  const [bodyConfirmationModal, setBodyConfirmationModal] = useState("");

  const closeDetailModal = () => setDetailModalOpen(false);
  const closeConfirmationModal = () => setConfirmationModalOpen(false);

  const openDetailModal = (orderId) => {
    setSelectedOrderId(orderId);
    setDetailModalOpen(true);
  };

  const openConfirmationModal = (orderId, newStatusId) => {
    if (newStatusId == ORDER_STATUS.CANCELED) {
      setTitleConfirmationModal("Rechazar pedido");
      setBodyConfirmationModal("¿Estás seguro de rechazar el pedido?");      
    } else {
      setTitleConfirmationModal("Aceptar pedido");
      setBodyConfirmationModal("¿Estás seguro de aceptar el pedido?");      
    }

    setSelectedOrderId(orderId);
    setConfirmAction(newStatusId);
    setConfirmationModalOpen(true);
  };

  const handleOrderStatusChange = async () => {
    if (!selectedOrderId || !confirmAction) return;

    const { error } = await supaBase
      .schema("com")
      .from("orders")
      .update({ state_type_id: confirmAction })
      .eq("id", selectedOrderId);

    if (error) {
      alert("Error al actualizar el estado. Intentalo otra vez.");
      console.log(error.message);
      return;
    }

    await fetchOrders();
    closeConfirmationModal();
  };

  const fetchOrders = async () => {
    const { data: ordersData, error: ordersError } = await supaBase
      .schema("com")
      .from("orders").select(`
        id,
        date,
        address,
        total_price,
        consumer_id,
        state_type_id,
        state_types ( name )
      `);

    const { data: consumerData, error: consumerError } = await supaBase
      .schema("com")
      .from("consumers").select(`
        id,
        user_id
      `);

    const { data: usersData, error: usersError } = await supaBase
      .schema("sec")
      .from("users").select(`
          id,
          name,
          last_name
          `);

    if (ordersError || usersError || consumerError) {
      return console.error("Error fetching data:", ordersError || usersError);
    }

    const enrichedOrders = ordersData.map((order) => {
      const consumer = consumerData.find((c) => c.id === order.consumer_id);
      const user = consumer
        ? usersData.find((u) => u.id === consumer.user_id)
        : null;

      return {
        ...order,
        consumer_name: user ? `${user.name} ${user.last_name}` : "Desconocido",
        status: order.state_types?.name || "Desconocido",
      };
    });

    setOrders(enrichedOrders);
    setLoading(false);
  };

  useEffect(() => {
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
                  className="bg-white border border-gray-200 py-4 px-5 rounded-1xl shadow hover:shadow-md transition-all duration-200 flex flex-col md:grid md:grid-cols-11 items-center gap-2 md:gap-4 text-sm"
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
                  <div className="w-100 flex space-x-2">
                    <Button
                      text="Aceptar"
                      onClick={() => {
                        openConfirmationModal(order.id, ORDER_STATUS.ACCEPTED);
                      }}
                      disabled={order.state_type_id !== ORDER_STATUS.PENDING}
                      mainColor="green"
                    />
                    <Button
                      text="Rechazar"
                      onClick={() => {
                        openConfirmationModal(order.id, ORDER_STATUS.CANCELED);
                      }}
                      disabled={order.state_type_id !== ORDER_STATUS.PENDING}
                      mainColor="red"
                    />
                    <Button
                      text="Ver detalle"
                      onClick={() => openDetailModal(order.id)}
                      disabled={order.state_type_id !== ORDER_STATUS.PENDING}
                      mainColor="blue"
                    />
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
          title={titleConfirmationModal}
          message={bodyConfirmationModal}
          cancelText="Cancelar"
          confirmText="Confirmar"
          onClose={closeConfirmationModal}
          onConfirm={handleOrderStatusChange}
        />
      )}
    </>
  );
};

export default OrdersDashboard;
