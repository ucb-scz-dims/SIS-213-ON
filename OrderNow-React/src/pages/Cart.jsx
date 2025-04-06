import OrderCard from "../components/OrderCard";
import Button from "../components/button/button";
import { useNavigate } from "react-router-dom";
import React from "react";



function Cart() {
  const navigate = useNavigate();
const handleClick = () => {
  navigate(`/restaurantes`);
};
  return (
    <div className="space-y-4 flex flex-col items-center mt-3 pt-24">
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <div onClick={handleClick}>
      <Button label="Continuar con el pedido" type="button"/>
      </div>
    </div>
  );
}

export default Cart;
