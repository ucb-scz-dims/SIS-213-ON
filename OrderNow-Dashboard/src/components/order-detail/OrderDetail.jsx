import React from "react";
import { useState, useEffect } from "react";
import getSupaBaseClient from "../../supabase/supabase-client";
import CloseIcon from "../../subcomponents/icons/CloseIcon";
import { ORDER_STATUS } from "../../config/order-status";
import Button from "../Button/Button"

const supaBaseCom = getSupaBaseClient("com");

function OrderDetail({ orderId, onClose, onRequestAction }) {
  const [orderDetail, setOrderDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let content;

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  if (loading) {
    content = <p>Cargando detalle del pedido..</p>;
  } else if (error) {
    content = <p>Error en la consulta: {error.message}</p>;
  } else {
    content = (
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
              <p>Bs. {order_detail.products.price * order_detail.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const fetchOrderDetails = async () => {
    const { data, error } = await supaBaseCom
      .from("orders")
      .select(
        `
          total_price,
          state_type_id,
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
      setError(error.message);
      return;
    }

    setOrderDetail(data);
    setLoading(false);
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
              <h3 className="font-semibold text-gray-800 text-2xl">
                Detalle del Pedido
              </h3>
              <div className="inline-flex ">
                <Button
                  children={<CloseIcon />}
                  mainColor="white"
                  textColor="black"
                  onClick={onClose}
                  paddingSize="nt"
                />
              </div>

            </div>

            <div className="p-4 overflow-y-auto h-[80%] flex flex-col">
              {content}
              <div className="flex flex-row justify-between border-t mt-auto">
                <p>Total: </p>
                <p>Bs. {orderDetail.total_price}</p>
              </div>
            </div>

            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t h-[10%]">
              {orderDetail.state_type_id == ORDER_STATUS.PENDING && (
                <>
                  <Button
                    text="Rechazar"
                    onClick={() => {
                      onRequestAction(orderId, ORDER_STATUS.CANCELED);
                      onClose();
                    }}
                    mainColor="gray"
                    textColor="white"
                    paddingSize="md"
                  />

                  <Button
                    text="Aceptar"
                    onClick={() => {
                      onRequestAction(orderId, ORDER_STATUS.ACCEPTED);
                      onClose();
                    }}
                    mainColor="blue"
                    textColor="white"
                    paddingSize="md"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetail;
