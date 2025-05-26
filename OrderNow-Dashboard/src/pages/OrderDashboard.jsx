import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "../utils/formatDate";
import OrderDetail from "../components/order-detail/OrderDetail";
import getSupaBaseClient from "../supabase/supabase-client";
import { ORDER_STATUS } from "../config/order-status";
import { ORDER_STATUS_NAMES } from "../config/order-status";
import ConfirmationModal from "../components/confirmation-modal/ConfirmationModal";
import Button from "../components/Button/Button";
import TotalOrdersCard from "../components/TotalOrderCard/TotalOrderCard";
import CheckboxFilter from "../components/filter/CheckboxFilter";
import FilterService from "../services/FilterService";
import CardTemplate from "../components/card-template/card-template";

const supaBase = getSupaBaseClient();
const filterService = new FilterService();

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);

  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [titleConfirmationModal, setTitleConfirmationModal] = useState("");
  const [bodyConfirmationModal, setBodyConfirmationModal] = useState("");
  const [seletedStatusFilters, setSeletedStatusFilters] = useState([]);
  const isUpdating = useRef(false);
  const ordersRef = useRef([]);

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

    if (isUpdating.current) return;

    isUpdating.current = true;
    const { error } = await supaBase
      .schema("com")
      .from("orders")
      .update({ state_type_id: confirmAction })
      .eq("id", selectedOrderId);

    if (error) {
      isUpdating.current = false;
      alert("Error al actualizar el estado. Intentalo otra vez.");
      console.log(error.message);
      return;
    }

    await fetchOrders();
    closeConfirmationModal();

    isUpdating.current = false;
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

    ordersRef.current = enrichedOrders;
    setOrders(
      filterService.filterByStatus(ordersRef.current, seletedStatusFilters)
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center gap-8">
        <div className="min-h-screen p-6 md:p-12 font-sans">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Pedidos del Restaurante
            </h1>

            {loading ? (
              <p className="text-center text-gray-500">Cargando pedidos...</p>
            ) : (
              <div className="space-y-4">
                <div className="p-6">
                  <TotalOrdersCard totalOrders={orders.length} />
                </div>
                <CheckboxFilter
                  title="Estado"
                  items={ORDER_STATUS_NAMES}
                  resetName="Reiniciar"
                  onChange={(items) => {
                    setSeletedStatusFilters(items);
                    setOrders(
                      filterService.filterByStatus(ordersRef.current, items)
                    );
                  }}
                />
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
                  <CardTemplate
                    key={order.id}
                    data={order}
                    functions={[openConfirmationModal, openDetailModal]}
                  />
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
      </div>
    </>
  );
};

export default OrdersDashboard;
