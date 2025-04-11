import OrderCard from "../components/OrderCard";
import Button from "../components/button/button";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState, useContext } from "react";
import { useCart, useCartDispatch } from "../context/CartContext";

function Cart() {
  const products = useCart();
  const dispatch = useCartDispatch();

  let totalPrice = products.reduce(
    (partialSum, { price, quantity }) => partialSum + price * quantity,
    0
  );
  const [price, setPrice] = useState(totalPrice);

  const onIncrease = (product) => {
    const newPrice = price + product.price;
    setPrice(newPrice);
    dispatch({
      type: "changed",
      product: {
        ...product,
        quantity: product.quantity + 1,
      },
    });
  };
  
  const onDecrease = (product) => {
    const newPrice = price - product.price;
    setPrice(newPrice);
    dispatch({
      type: "changed",
      product: {
        ...product,
        quantity: product.quantity - 1,
      },
    });
  };

  const onDelete = (quantity, productPrice, productId) => {
    dispatch({
      type: "deleted",
      id: productId,
    });

    const newPrice = price - productPrice * quantity;
    setPrice(newPrice);
  };

  const navigate = useNavigate();
  const goToBusiness = () => {
    navigate(`/restaurantes`);
  };
  const goToCheckout = () => {
    navigate(`/checkout`);
  };

  if (price <= 0) {
    return (
      <div className="space-y-4 flex flex-col items-center mt-3 pt-24">
        <a>No tienes ningún producto en el carrito.</a>
        <div onClick={goToBusiness}>
          <Button label="Pedir productos" type="button" />
        </div>
      </div>
    );
  }
  return (
    <cartListContext value={products}>
      <div className="space-y-4 flex flex-col items-center mt-3 pt-24">
        {products.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            srcImage={product.srcImage}
            price={product.price}
            quantity={product.quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onDelete={onDelete}
          />
        ))}
        <div className="flex flex-col items-center">
          <h3 className="text-xl m-2">Monto a pagar: {price} Bs.</h3>
          <div onClick={goToCheckout}>
            <Button label="Continuar con el pedido" type="button" />
          </div>
        </div>
      </div>
    </cartListContext>
  );
}

export default Cart;
