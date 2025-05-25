import React from 'react'
import OrderDetail from "../components/order-detail/OrderDetail";
import ConfirmationModal from "../components/confirmation-modal/ConfirmationModal";
import Button from "../components/Button/Button";
import TotalOrdersCard from "../components/TotalOrderCard/TotalOrderCard";
import CheckboxFilter from "../components/filter/CheckboxFilter";

function OrderDashboardView({
    loading,
    orders,
    
    ORDER_STATUS_NAMES,
    ORDER_STATUS,

    isDetailModalOpen,
    openDetailModal,
    closeDetailModal,

    isConfirmationModalOpen,
    openConfirmationModal,
    closeConfirmationModal,

    applyStatusFilter,

    selectedOrderId, 
    
    titleConfirmationModal,
    bodyConfirmationModal,
    
    formatDate,
    handleOrderStatusChange
}) {
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
                <CheckboxFilter title="Estado" items={ORDER_STATUS_NAMES} resetName="Reiniciar" onChange={(items) => applyStatusFilter(items)}/>
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
                        className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 font-bold disabled:opacity-20 rounded-full"
                      />
                      <Button
                        text="Rechazar"
                        onClick={() => {
                          openConfirmationModal(order.id, ORDER_STATUS.CANCELED);
                        }}
                        disabled={order.state_type_id !== ORDER_STATUS.PENDING}
                        className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 font-bold disabled:opacity-20 rounded-full"
                      />
                      <Button
                        text="Ver detalle"
                        onClick={() => openDetailModal(order.id)}
                        disabled={order.state_type_id !== ORDER_STATUS.PENDING}
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 font-bold disabled:opacity-20 rounded-full"
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
      </div>
    </>
  )
}

export default OrderDashboardView