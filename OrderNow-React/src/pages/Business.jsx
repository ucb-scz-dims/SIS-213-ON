import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductsList from "../components/ProductList";
import IconInfo from "../components/IconInfo";
import Modal from "../components/information/InfoRestaurante";
import Rating from "../components/atoms/Rating";
import { useRestaurant } from "../context/CartContext";
import ClosedBusinessModal from "../components/ClosedBusinessModal";
import useSupabaseFetch from '../hooks/useSupabaseFetch';

function Business() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setRestaurantId } = useRestaurant();
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  React.useEffect(() => {
    setRestaurantId(id);
  }, [id, setRestaurantId]);

  const { data: business, loading: loadingBusiness, error: errorBusiness } = useSupabaseFetch(
    "businesses",
    {
      select: "*, rating",
      filters: [ { type: "eq", column: "id", value: id } ],
      order: null
    }
  );

  const dayNum = (() => {
    const d = new Date().getDay();
    return d === 0 ? 7 : d;
  })();
  const { data: todaySchedule, loading: loadingSchedule, error: errorSchedule } = useSupabaseFetch(
    "schedule",
    {
      select: "opening_time,clossing_time",
      filters: [
        { type: "eq", column: "business_id", value: id },
        { type: "eq", column: "day", value: dayNum }
      ],
      order: { column: "opening_time", ascending: true }
    }
  );

  if (loadingBusiness || loadingSchedule) {
    return <div className="pt-24 text-center">Cargando detalles...</div>;
  }
  if (errorBusiness || errorSchedule) {
    return <div className="pt-24 text-center">No se pudo cargar el negocio.</div>;
  }
  if (!business || business.length === 0) {
    return <div className="pt-24 text-center">No se encontró el negocio.</div>;
  }
  const businessData = Array.isArray(business) ? business[0] : business;

  const toMinutes = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const nowMinutes = (() => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  })();
  const isOpenNow = todaySchedule && todaySchedule.some(({ opening_time, clossing_time }) => {
    const start = toMinutes(opening_time);
    const end = toMinutes(clossing_time);
    return nowMinutes >= start && nowMinutes < end;
  });
  const isActuallyOpen = businessData.is_open && isOpenNow;
  const scheduleText = todaySchedule && todaySchedule.length > 0
    ? todaySchedule
        .map(({ opening_time, clossing_time }) => `${opening_time.slice(0, 5)} – ${clossing_time.slice(0, 5)}`)
        .join("  |  ")
    : "Cerrado hoy";

  return (
    <main className="max-w-6xl mx-auto px-4 pt-24 pb-8">
      <ClosedBusinessModal
        isOpen={!isActuallyOpen && !showMenu}
        onBackToList={() => navigate("/restaurantes")}
        onContinue={() => setShowMenu(true)}
      />
      {!isActuallyOpen && (
        <div className="bg-red-100 text-red-800 text-center py-3 font-semibold rounded mb-4">
          Este negocio está cerrado actualmente
        </div>
      )}
      <div className={`bg-white rounded-lg shadow-md p-6 mb-8 transition-all ${isActuallyOpen ? "" : "opacity-50 grayscale"}`}>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {businessData.name}
            </h2>
            <Rating rating={businessData.rating} />
            {businessData.description && (
              <p className="text-gray-600">{businessData.description}</p>
            )}
            {businessData.address && (
              <p className="text-gray-600">{businessData.address}</p>
            )}
            <p className="text-sm text-gray-600">
              Horario: {scheduleText}
            </p>
          </div>
          <div
            className="cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            <IconInfo />
          </div>
        </div>
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Menú</h2>
        <ProductsList businessId={id} isMenuEnabled={isActuallyOpen} />
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

export default Business;
