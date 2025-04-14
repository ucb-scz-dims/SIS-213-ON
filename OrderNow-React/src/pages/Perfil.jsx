import React, { useState, useEffect } from "react";
import { logout } from "../Supertokens";
import { getUserId } from "../Supertokens";

const Perfil = () => {
  const [userId, setUserId] = useState(null);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserId();
        setUserId(id);
      } catch (error) {
        console.error("Error obteniendo el userId", error);
      }
    };
    fetchUserId();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-28 p-6 bg-white rounded-xl shadow-lg text-center space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Perfil de usuario</h2>

      <div className="bg-gray-100 p-4 rounded-lg text-gray-700">
        <p className="text-sm font-semibold">ID del usuario:</p>
        <p className="text-base mt-1">{userId ? userId : "Cargando..."}</p>
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full text-sm font-semibold shadow-md transition duration-300"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Perfil;
