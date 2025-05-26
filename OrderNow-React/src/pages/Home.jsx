import React, { useEffect, useState } from 'react';
import BusinessTypeCard from '../components/BusinessTypeCard';
import CardSlider from '../components/CardSlider';
import getSupaBaseClient from '../supabase-client';
import MapModal from '../components/MapModal';

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const supabase = getSupaBaseClient('com');
      const { data, error } = await supabase
        .from('orders')
        .select('id, date, total_price, business_id, state_type_id, state_types(name), businesses(name)')
        .neq('state_type_id', 4)
        .order('date', { ascending: false });

      if (!error) setOrders(data || []);
    };
    fetchOrders();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsMapOpen(true);
  };

  return (
    <>
      <div className="w-full max-w-3xl mx-auto mt-6">
        <h3 className="text-lg font-semibold mb-2">Tus órdenes recientes</h3>
        <ul className="divide-y divide-gray-200 bg-white rounded shadow text-sm">
          {orders.length === 0 && (
            <li className="p-3 text-gray-500">No tienes órdenes recientes.</li>
          )}
          {orders.map(order => (
            <li
              key={order.id}
              className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => handleOrderClick(order)}
            >
              <div>
                <span className="font-medium">{order.businesses?.name}</span>
                <span className="ml-2 text-gray-400">{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="px-2 py-1 rounded text-xs bg-gray-100">{order.state_types?.name}</span>
                <span className="ml-3 font-semibold">${order.total_price}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center w-full ">
        <div className="w-full max-w-3xl p-4">
          <h2 className="text-xl font-bold text-left">Bienvenido. ¿Qué vas a pedir hoy?</h2>
        </div>
      </div>

      <CardSlider>
        <BusinessTypeCard name="Restaurantes" bgColor="bg-amber-400" imagePath="burger.png" url={"restaurantes"} />
        <BusinessTypeCard />
        <BusinessTypeCard />
        <BusinessTypeCard />
        <BusinessTypeCard />
      </CardSlider>

      <MapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        origin={{ lat: -17.7833, lng: -63.1833 }}
        destination={{ lat: -17.7840, lng: -63.1800 }}
      />
    </>
  );
};

export default Home;
