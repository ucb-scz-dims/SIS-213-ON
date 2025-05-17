import React, { useEffect, useState } from "react";
import { BusinessService } from "../services/BusinessService";

function Businesses() {

  const [businesses, setBusinesses] = useState([]);
 
  const fetchBusinesses = async () => {
    try {
      const data = await BusinessService.getAllBusiness();
      console.log(data);
      setBusinesses(data);
    }
    catch(error) {
      alert(error);
    }
  }

  useEffect(() => {
    fetchBusinesses();
  }, []);

  return (
    <div className="w-[80%] m-auto mt-30 flex flex-col items-center gap-5 mb-30">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Tabla de restaurantes
      </h1>
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
                <tr key={business.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">{ business.name }</td>
                  <td className="px-6 py-4">{ business.description }</td>
                  <td className="px-6 py-4">{ business.address }</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {BusinessService.isOpen(business) ? (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                          Abierto
                        </>
                      
                      ): (
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
    </div>
  );
}

export default Businesses;
