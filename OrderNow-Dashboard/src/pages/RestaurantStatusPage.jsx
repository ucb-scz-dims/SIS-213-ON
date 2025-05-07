import React, { useEffect, useState } from "react";
import getSupaBaseClient from "../supabase/supabase-client";

export default function RestaurantStatusPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const supabase = getSupaBaseClient("com");

  const userId = 1; // ID fijo, remplazar cuando se implemente el inicio de sesion

  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select("id, name, is_open")
        .eq("user_id", userId);

      if (error) {
        console.error("Error al obtener los negocios:", error);
      } else {
        setRestaurants(data);
        if (data.length > 0) {
          setSelectedBusinessId(data[0].id);
          setIsOpen(data[0].is_open);
        }
      }

      setLoading(false);
    };

    fetchBusinesses();
  }, [userId]);

  const handleBusinessChange = (e) => {
    const businessId = parseInt(e.target.value, 10);
    const selected = restaurants.find((r) => r.id === businessId);
    setSelectedBusinessId(businessId);
    setIsOpen(selected?.is_open ?? true);
  };

  const toggleIsOpen = async () => {
    if (!selectedBusinessId) return;

    const { error } = await supabase
      .from("businesses")
      .update({ is_open: !isOpen })
      .eq("id", selectedBusinessId);

    if (error) {
      console.error("Error al actualizar is_open:", error);
    } else {
      setIsOpen(!isOpen);
      setRestaurants((prev) =>
        prev.map((r) =>
          r.id === selectedBusinessId ? { ...r, is_open: !isOpen } : r
        )
      );
    }
  };

  if (loading) return <p className="text-gray-600">Cargando...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold">Estado del Restaurante</h1>

      {restaurants.length === 0 ? (
        <p>No tienes restaurantes registrados.</p>
      ) : (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="restaurantSelect" className="block font-medium mb-1">
              Selecciona un restaurante:
            </label>
            <select
              id="restaurantSelect"
              value={selectedBusinessId ?? ""}
              onChange={handleBusinessChange}
              className="w-full border px-3 py-2 rounded"
            >
              {restaurants.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between mb-4">
            <label htmlFor="isOpenToggle" className="text-lg font-medium">
              Restaurante {isOpen ? "Abierto" : "Cerrado"}
            </label>
            <input
              id="isOpenToggle"
              type="checkbox"
              checked={isOpen}
              onChange={toggleIsOpen}
              className="w-5 h-5"
            />
          </div>
          <p className="text-sm text-gray-600">
            Cambia el estado para pausar los pedidos por mantenimiento o emergencia.
          </p>
        </div>
      )}
    </div>
  );
}
