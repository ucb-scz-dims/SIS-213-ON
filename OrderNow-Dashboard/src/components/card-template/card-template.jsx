import OrderCard from "../order-card/order-card";
import React, { useEffect, useRef, useState } from "react";

const CardTemplate = ({ data, functions }) => {
  const [isOrder, setOrder] = useState(false);
  const [isProduct, setProduct] = useState(false);
  const [isBusiness, setBusiness] = useState(false);

  const defineType = () => {
    if (data.date) {
      setOrder(true);
    }
    if(data.price){
        setProduct(true)
    }
    if(data.address){
        setBusiness(true)
    }
  };

  useEffect(() => {
    defineType();
  }, []);

  return (
    <>
      {isOrder && (
        <OrderCard
          order={data}
          onOpenConfirmationModal={functions[0]}
          onOpenDetailModal={functions[1]}
        />
      )}
    </>
  );
};

export default CardTemplate;
