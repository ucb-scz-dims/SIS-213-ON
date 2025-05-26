import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getSupaBaseClient from "../supabase-client";
import ProductsListContainer from "../components/ProductList/ProductsListContainer";
import IconInfo from "../components/IconInfo";
import Modal from "../components/information/InfoRestaurante";
import Rating from "../components/atoms/Rating";
import { useRestaurant } from "../context/CartContext";
import ClosedBusinessModal from "../components/ClosedBusinessModal";

function Business() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setRestaurantId } = useRestaurant();
  const supaBaseCom = getSupaBaseClient("com");

  const [business, setBusiness] = useState(null);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bestSellerIds, setBestSellerIds] = useState([]);

  const getDayNumber = () => {
    const d = new Date().getDay();
    return d === 0 ? 7 : d;
  };

  useEffect(() => {
    setRestaurantId(id);

    const fetchAll = async () => {
      setLoading(true);

      const { data: bussines, error: errbussines } = await supaBaseCom
        .from("businesses")
        .select("*, rating")
        .eq("id", id)
        .single();
      if (errbussines) {
        return alert("No pude cargar el negocio.");
      }
      setBusiness(bussines);

      const dayNum = getDayNumber();
      const { data: sched, error: errSched } = await supaBaseCom
        .from("schedule")
        .select("opening_time,clossing_time")
        .eq("business_id", id)
        .eq("day", dayNum)
        .order("opening_time", { ascending: true });
      if (errSched) {
        return alert("No pude cargar horarios.");
      }
      setTodaySchedule(sched || []);
      const { data: bestSellers, error: errBestSellers } = await supaBaseCom
        .from('best_sellers_for_business')
        .select(`product_id`)
        .eq('business_id', id)
        .order('total_vendidos', { ascending: false })
        .limit(5);

      if (errBestSellers) {
        console.error("Error cargando productos más vendidos:", errBestSellers);
      } else if (bestSellers) {
        setBestSellerIds(bestSellerIds.map((item) => item.product_id));
      }

      setLoading(false);
    };

    fetchAll();
  }, [id, supaBaseCom, setRestaurantId, bestSellerIds]);

  if (loading)
    return <div className="pt-24 text-center">Cargando detalles...</div>;
  if (!business)
    return <div className="pt-24 text-center">No se encontró el negocio.</div>;

  const toMinutes = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const nowMinutes = (() => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  })();

  const isOpenNow = todaySchedule.some(({ opening_time, clossing_time }) => {
    const start = toMinutes(opening_time);
    const end = toMinutes(clossing_time);
    return nowMinutes >= start && nowMinutes < end;

  });
  const isActuallyOpen = business.is_open && isOpenNow;

  const scheduleText =
    todaySchedule.length > 0
      ? todaySchedule
        .map(
          ({ opening_time, clossing_time }) =>
            `${opening_time.slice(0, 5)} – ${clossing_time.slice(0, 5)}`
        )
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

      <div
        className={`bg-white rounded-lg shadow-md p-6 mb-8 transition-all ${isActuallyOpen ? "" : "opacity-50 grayscale"
          }`}
      >
        <div className="flex items-center gap-6">
          {/* Imagen placeholder */}
          <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {business.name}
            </h2>
            <Rating rating={business.rating} />
            {business.description && (
              <p className="text-gray-600">{business.description}</p>
            )}
            {business.address && (
              <p className="text-gray-600">{business.address}</p>
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
        <ProductsListContainer businessId={id} isMenuEnabled={isActuallyOpen} bestSellerIds={bestSellerIds} />
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </main>
  );
}

export default Business;
