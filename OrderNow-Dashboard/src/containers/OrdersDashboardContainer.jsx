import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "../utils/formatDate";
import { ORDER_STATUS } from "../config/order-status";
import { ORDER_STATUS_NAMES } from "../config/order-status";
import FilterService from "../services/FilterService";
import OrderDashboardFacade from '../services/facade/OrderDashboardFacade';
import OrderDashboardView from "../pages/OrderDashboardView";

const filterService = new FilterService();

function OrdersDashboardContainer() {
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


  const applyStatusFilter = (items) => {
    setSeletedStatusFilters(items);
    setOrders(filterService.filterByStatus(ordersRef.current, items))
  }

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
    if (!selectedOrderId || !confirmAction)
      return;

    if (isUpdating.current)
      return

    isUpdating.current = true;
    
    try {
      await OrderDashboardFacade.changeStatusOrder(selectedOrderId, confirmAction);
      await fetchOrders();
    }
    catch(error) {
      alert("Error al actualizar el estado. Intentalo otra vez.");
      console.error(error.message);
    }
    finally {
      closeConfirmationModal();
      isUpdating.current = false;
    }
    
  };

  const fetchOrders = async () => {
    const enrichedOrders = await OrderDashboardFacade.getDashboardOrders();
    
    ordersRef.current = enrichedOrders;
    setOrders(filterService.filterByStatus(ordersRef.current, seletedStatusFilters));
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    
    <OrderDashboardView
      loading={loading}
      orders={orders}

      ORDER_STATUS_NAMES={ORDER_STATUS_NAMES}
      ORDER_STATUS={ORDER_STATUS}

      isDetailModalOpen={isDetailModalOpen} 
      openDetailModal={openDetailModal}
      closeDetailModal={closeDetailModal}

      isConfirmationModalOpen={isConfirmationModalOpen}
      openConfirmationModal={openConfirmationModal}
      closeConfirmationModal={closeConfirmationModal}

      applyStatusFilter={applyStatusFilter}

      selectedOrderId={selectedOrderId}

      titleConfirmationModal={titleConfirmationModal}
      bodyConfirmationModal={bodyConfirmationModal}
      
      formatDate={formatDate}
      handleOrderStatusChange={handleOrderStatusChange}
    />
  );
}

export default OrdersDashboardContainer