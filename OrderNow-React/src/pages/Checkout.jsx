import OrderCard from "../components/OrderCard";
import Button from "../components/button/button";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";

const fakeProducts = [
  {
    id: 1,
    srcImage:
      "https://upload.wikimedia.org/wikipedia/commons/a/a5/Roast_chicken.jpg",
    title: "Pollos Campeón 1/4",
    description:
      "Pollo Campeón es un restaurante que sirve pollo a la brasa y es conocido por su salsa picante.",
    price: 10,
    quantity: 1,
  },
  {
    id: 2,
    srcImage:
      "https://upload.wikimedia.org/wikipedia/commons/a/a5/Roast_chicken.jpg",
    title: "Pollos Campeón 1/2",
    description:
      "Pollo Campeón es un restaurante que sirve pollo a la brasa y es conocido por su salsa picante.",
    price: 20,
    quantity: 4,
  },
  {
    id: 3,
    srcImage:
      "https://upload.wikimedia.org/wikipedia/commons/a/a5/Roast_chicken.jpg",
    title: "Pollos Campeón Nuggets",
    description:
      "Pollo Campeón es un restaurante que sirve pollo a la brasa y es conocido por su salsa picante.",
    price: 30,
    quantity: 5,
  },
];

let totalPrice = fakeProducts.reduce(
  (partialSum, { price, quantity }) => partialSum + (price*quantity),
  0
);

function Checkout() {
  const [products, setProducts] = useState(fakeProducts);
  const [price, setPrice] = useState(totalPrice);
  const navigate = useNavigate();
  const restaurant = () => {
    navigate(`/restaurantes`);
  };
  return (
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
        />
      ))}
      <div className="flex flex-col items-center">
        <h3 className="text-xl m-2">Total del pedido: {price} Bs.</h3>
        <div onClick={restaurant}>
          <Button label="Confirmar pedido" type="button" />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
