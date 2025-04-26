import Button from "../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState, useContext } from "react";
import { useCart, useCartDispatch } from "../context/CartContext";

const Checkout = () => {
  const products = useCart();
  let totalPrice = products.reduce(
    (partialSum, { price, quantity }) => partialSum + price * quantity,
    0
  );
  const [price, setPrice] = useState(totalPrice);
  const navigate = useNavigate();
  const goToHome = () => {
    navigate(`/`);
  };
  return (
    <div className="space-y-4 flex flex-col items-center mt-3 pt-24">
      <h1>Confirmación del producto</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead>
            <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <th class="px-6 py-3">Producto</th>
              <th class="px-6 py-3">Cantidad</th>
              <th class="px-6 py-3">Precio unit.</th>
              <th class="px-6 py-3">Precio total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.title}
                </td>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.quantity}
                </td>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.price}
                </td>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.price * product.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-xl m-2">Total del pedido: {price} Bs.</h3>
        <div onClick={goToHome}>
          <Button label="Confirmar pedido" type="button" />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
