import React from 'react'
import {Link} from 'react-router-dom'

function Products() {
  return (
    <div className="w-[80%] m-auto mt-30 flex flex-col items-center gap-5 mb-30">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Lista de productos
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
                Precio
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
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">Hamburguesa No Clásica</td>
              <td className="px-6 py-4">Hamburguesa con queso, lechuga, tomate y salsa especial</td>
              <td className="px-6 py-4">Bs. 55.5</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                  Disponible
                </div>
              </td>
               <td className="px-6 py-4">
                <Link
                  to='/product/1/update'
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Editar
                </Link>
              </td>
            </tr>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">Papas Fritas</td>
              <td className="px-6 py-4">Papas fritas crujientes con sal y especias</td>
              <td className="px-6 py-4">Bs. 20</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                  Disponible
                </div>
              </td>
              <td className="px-6 py-4">
                <Link
                  to='/product/1/update'
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Editar
                </Link>
              </td>
            </tr>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">Pizza Margarita</td>
              <td className="px-6 py-4">Pizza clásica con salsa de tomate, mozzarella y albahaca</td>
              <td className="px-6 py-4">Bs. 70</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                  Disponible
                </div>
              </td>
              <td className="px-6 py-4">
                <Link
                  to='/product/1/update'
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Editar
                </Link>
              </td>
            </tr>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">Ensalada César</td>
              <td className="px-6 py-4">Ensalada con pollo, queso parmesano, crutones y aderezo César</td>
              <td className="px-6 py-4">Bs. 35</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                  No disponible
                </div>
              </td>
              <td className="px-6 py-4">
                <Link
                  to='/product/1/update'
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Editar
                </Link>
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products