import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRestaurant } from "../context/CartContext";
import { fetchBusinessData } from "../services/businessService";

import ProductsList from "../components/ProductList";
import IconInfo from "../components/IconInfo";
import Modal from "../components/information/InfoRestaurante";
import Rating from "../components/atoms/Rating";
import ClosedBusinessModal from "../components/ClosedBusinessModal";

function Business() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setRestaurantId } = useRestaurant();

  const [business, setBusiness] = useState(null);
  const [scheduleText, setScheduleText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRestaurantId(id);

    const loadData = async () => {
      try {
        setLoading(true);
        const { business, scheduleText, isOpen } = await fetchBusinessData(id);
        setBusiness(business);
        setScheduleText(scheduleText);
        setIsOpen(isOpen);
      } catch (e) {
        alert(e.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, setRestaurantId]);

  if (loading) return <div className="pt-24 text-center">Cargando detalles...</div>;
  if (!business) return <div className="pt-24 text-center">No se encontró el negocio.</div>;

  return (
    <main className="max-w-6xl mx-auto px-4 pt-24 pb-8">
      <ClosedBusinessModal
        isOpen={!isOpen && !showMenu}
        onBackToList={() => navigate("/restaurantes")}
        onContinue={() => setShowMenu(true)}
      />
      {!isOpen && (
        <div className="bg-red-100 text-red-800 text-center py-3 font-semibold rounded mb-4">
          Este negocio está cerrado actualmente
        </div>
      )}
      <div className={`bg-white rounded-lg shadow-md p-6 mb-8 transition-all ${isOpen ? "" : "opacity-50 grayscale"}`}>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{business.name}</h2>
            <Rating rating={business.rating} />
            {business.description && <p className="text-gray-600">{business.description}</p>}
            {business.address && <p className="text-gray-600">{business.address}</p>}
            <p className="text-sm text-gray-600">Horario: {scheduleText}</p>
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
        <ProductsList businessId={id} isMenuEnabled={isOpen} />
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

export default Business;
