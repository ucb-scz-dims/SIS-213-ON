import React, { useEffect, useState } from "react";
import { BusinessService } from "../services/BusinessService";
import { Link } from "react-router-dom";

function Businesses() {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBusinesses = async () => {
    try {
      const data = await BusinessService.getAllBusiness();
      setBusinesses(data);
      setIsLoading(false);
    } catch (error) {
      alert("Error al obtener los restaurantes. Recargue la pagina");
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  return (
    <div className="w-[80%] m-auto mt-30 flex flex-col items-center gap-5 mb-30">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Tabla de restaurantes
      </h1>
      {businesses.length !== 0 ? (
        <div className="overflow-x-auto w-full mt-15">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-md">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3">
                  Dirección
                </th>
                <th scope="col" className="px-6 py-3">
                  Disponibilidad
                </th>
                <th scope="col" className="px-6 py-3">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {businesses.map((business) => (
                <tr
                  key={business.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{business.name}</td>
                  <td className="px-6 py-4">{business.description}</td>
                  <td className="px-6 py-4">{business.address}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {BusinessService.isOpen(business) ? (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                          Abierto
                        </>
                      ) : (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                          Cerrado
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Editar
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3>
          {isLoading
            ? "Cargando restaurantes..."
            : "No tienes restaurantes registrados"}
        </h3>
      )}

      <Link
        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        to="/registration"
      >
        Registrar restaurante
      </Link>
    </div>
  );
}

export default Businesses;
