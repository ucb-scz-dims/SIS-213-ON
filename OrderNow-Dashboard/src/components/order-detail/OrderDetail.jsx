import React from "react";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import CloseIcon from "../../subcomponents/icons/CloseIcon"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function OrderDetail({orderId, closeModal}) {
  const [orderDetail, setOrderDetail] = useState({});

  const supaBaseCom = createClient(supabaseUrl, supabaseKey, {
    db: { schema: "com" },
  });

  useEffect(() => {
    fetchBusiness();
  }, []);

  const fetchBusiness = async () => {
    const { data, error } = await supaBaseCom
      .from("orders")
      .select(
        `
          total_price,
          order_details(
            id,
            products(
              name,
              price
            ),
            quantity
          )
        `
      )
      .eq("id", orderId)
      .single();

    if (error) {
      alert(error.message);
      return;
    }
    
    setOrderDetail(data);
  };



  return (
    <>
      <div
        className="fixed top-0 left-0 z-80 w-full h-full overflow-x-hidden overflow-y-auto bg-opacity-50 bg-[rgba(0,0,0,0.5)]"
        role="dialog"
        tabIndex="-1"
      >
        <div className="flex justify-center items-center h-full">
          <div className="max-w-lg w-full m-3 h-[70%] bg-white border border-gray-200 shadow-2xs rounded-md">
            <div className="flex justify-between items-center py-3 px-4 border-b  h-[10%]">
              <h3 className="font-semibold text-gray-800 text-2xl">Detalle del Pedido</h3>
              <button
                type="button"
                className="inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200"
                onClick={() => closeModal()}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-[80%] flex flex-col">
              <div className="flex flex-col mb-5">
                <h3 className="text-2xl text-center font-semibold">Productos</h3>

                <div className="flex flex-col gap-3">
                  {orderDetail.order_details?.map((order_detail) => (
                    <div
                      className="flex flex-row justify-between"
                      key={order_detail.id}
                    >
                      <p>
                        x{order_detail.quantity} {order_detail.products.name}
                      </p>
                      <p>
                        Bs. {order_detail.products.price * order_detail.quantity}
                      </p>
                    </div>
                  ))}

                </div>

                
              </div>

              <div className="flex flex-row justify-between border-t mt-auto">
                  <p>Total: </p>
                  <p>Bs. {orderDetail.total_price}</p>
                </div>
            </div>

            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t h-[10%]">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50"
                onClick={() => closeModal()}
              >
                Rechazar
              </button>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
}

export default OrderDetail;
