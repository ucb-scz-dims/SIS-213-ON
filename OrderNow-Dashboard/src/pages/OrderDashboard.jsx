import React, { useEffect, useState } from 'react';

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          id: 101,
          date: '2025-04-06 13:45',
          total_price: 42.99,
          address: 'Calle Falsa 123',
          consumer_name: 'Juan',
          state_type_id: 1,
          business_id: 1,
          details: [
            { product_name: 'Chuleta', quantity: 2 },
            { product_name: 'Cocacola', quantity: 1 }
          ]
        },
        {
          id: 102,
          date: '2025-04-06 14:15',
          total_price: 18.5,
          address: 'Av. Siempre Viva 742',
          consumer_name: 'Pedro',
          state_type_id: 2,
          business_id: 1,
          details: [
            { product_name: 'Pollo picante', quantity: 3 }
          ]
        },
        {
          id: 103,
          date: '2025-04-06 14:50',
          total_price: 25.0,
          address: 'Calle Inventada 456',
          consumer_name: 'Lucía',
          state_type_id: 3,
          business_id: 1,
          details: [
            { product_name: 'Tacos', quantity: 2 }
          ]
        },
        {
          id: 103,
          date: '2025-04-06 14:50',
          total_price: 25.0,
          address: 'Calle Inventada 456',
          consumer_name: 'Lucía',
          state_type_id: 3,
          business_id: 1,
          details: [
            { product_name: 'Tacos', quantity: 2 }
          ]
        }
      ];

      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusText = (id) => {
    switch (id) {
      case 1: return '🟡 Pendiente';
      case 2: return '🟠 En camino';
      case 3: return '🟢 Entregado';
      case 4: return '🔴 Cancelado';
      default: return '❔ Desconocido';
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  

  return (
    <div className="min-h-screen p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          📋 Pedidos del Restaurante
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Cargando pedidos...</p>
        ) : (
          <div className="space-y-4">
            {/* Header */}
            <div className="hidden md:grid grid-cols-10 bg-gray-100 text-gray-600 font-semibold px-8 py-3 shadow-sm text-sm">
              <span className="w-12">ID</span>
              <span className="w-28">Fecha</span>
              <span className="col-span-3">Dirección</span>
              <span className="w-28">Consumidor</span>
              <span className="w-20">Total</span>
              <span className="w-24">Estado</span>
              <span className="w-24">Confirmación</span>
            </div>

            {/* Rows */}
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 py-4 px-5 rounded-1xl shadow hover:shadow-md transition-all duration-200 flex flex-col md:grid md:grid-cols-10 items-center gap-2 md:gap-4 text-sm"
              >
                <div className="w-12 font-bold text-indigo-600">#{order.id}</div>
                <div className="w-28">{formatDate(order.date)}</div>
                <div className="col-span-3 truncate">{order.address}</div>
                <div className="w-28">{order.consumer_name}</div>
                <div className="w-20 font-medium text-green-700 text-right">Bs. {order.total_price.toFixed(2)}</div>
                <div className="w-24">{getStatusText(order.state_type_id)}</div>
                <div className="w-24 flex space-x-2">
                  <button className="text-green-600 hover:underline">Aceptar</button>
                  <button className="text-red-600 hover:underline">Rechazar</button>
                </div>
              </div>
            ))}
          </div>

        )}
      </div>
    </div>
  );
};

export default OrdersDashboard;
