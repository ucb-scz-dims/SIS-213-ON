import OrderCard from "../components/OrderCard";
import Button from "../components/button/button";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";

//! SOLO UTILIZAR ENLACES DE IMÁGENES, NO USAR FOTOS LOCALES!!!!

const fakeProducts = [
  {
    id: 1,
    srcImage: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Roast_chicken.jpg",
    title: "Pollos Campeón",
    description:
      "Pollo Campeón es un restaurante que sirve pollo a la brasa y es conocido por su salsa picante.",
    price: 10,
  },
  {
    id: 2,
    srcImage: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Roast_chicken.jpg",
    title: "Pollos Campeón",
    description:
      "Pollo Campeón es un restaurante que sirve pollo a la brasa y es conocido por su salsa picante.",
    price: 20,
  },
  {
    id: 3,
    srcImage: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Roast_chicken.jpg",
    title: "Pollos Campeón",
    description:
      "Pollo Campeón es un restaurante que sirve pollo a la brasa y es conocido por su salsa picante.",
    price: 30,
  },
];

let totalPrice = fakeProducts.reduce(
  (partialSum, { price }) => partialSum + price,
  0
);

function Cart() {
  const [products, setProducts] = useState(fakeProducts);
  const [price, setPrice] = useState(totalPrice);

  const onIncrease = (productPrice) => {
    const newPrice = price + productPrice;
    setPrice(newPrice);
  };

  const onDecrease = (quantity, productPrice, productId) => {
    if (quantity <= 0) {
      const update = products.filter((product) => product.id !== productId);
      setProducts(update);
    }

    const newPrice = price - productPrice;
    setPrice(newPrice);
  };

  const onDelete = (quantity, productPrice, productId) => {
    const update = products.filter((product) => product.id !== productId);
    setProducts(update);

    const newPrice = price - productPrice * quantity;
    setPrice(newPrice);
  }

  const navigate = useNavigate();
  const restaurant = () => {
    navigate(`/restaurantes`);
  };

  if(price <= 0){
    return (
      <div className="space-y-4 flex flex-col items-center mt-3 pt-24">
        <a>No tienes ningún producto en el carrito.</a>
        <div onClick={restaurant}>
          <Button label="Pedir productos" type="button" />
        </div>
      </div>
    )
  }
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
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onDelete={onDelete}
        />
      ))}
      <div className="flex flex-col items-center">
        <h3 className="text-xl m-2">Bs. {price}</h3>
        <div onClick={restaurant}>
          <Button label="Continuar con el pedido" type="button" />
        </div>
      </div>
    </div>
  );
}

export default Cart;