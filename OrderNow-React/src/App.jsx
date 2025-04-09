import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerifySesion from "./pages/VerifySesion";

import { createContext, useState } from "react";

import Home from "./pages/Home";
import Businesses from "./pages/Businesses";
import Restaurante from "./pages/Restaurante";
import Layout from "./pages/Layout";
import Cart from "./pages/Cart";
import Perfil from "./pages/Perfil";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Checkout from "./pages/Checkout";
import { CartListContext } from "./Contexts";

const fakeProducts = [
  {
    id: 1,
    srcImage: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Roast_chicken.jpg",
    title: "Pollos Campeón",
    description:
      "Pollo Campeón es un restaurante que sirve pollo a la brasa y es conocido por su salsa picante.",
    price: 10,
    quantity: 1,
  },
  {
    id: 2,
    srcImage: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Roast_chicken.jpg",
    title: "Pollos Campeón",
    description:
      "Pollo Campeón es un restaurante que sirve pollo a la brasa y es conocido por su salsa picante.",
    price: 20,
    quantity: 4,
  },
  {
    id: 3,
    srcImage: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Roast_chicken.jpg",
    title: "Pollos Campeón",
    description:
      "Pollo Campeón es un restaurante que sirve pollo a la brasa y es conocido por su salsa picante.",
    price: 30,
    quantity: 5,
  },
];

const App = () => {
  const [CartList, SetCartList] = useState(fakeProducts);
  return (
    <CartListContext.Provider value={CartList}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/restaurantes" element={<Businesses />} />
            <Route path="/restaurante/:id" element={<Restaurante />} />
            <Route path="/restaurant/:id/cart" element={<Cart />}/>
            <Route path="/perfil" element={<VerifySesion><Perfil /></VerifySesion>}/>
            <Route path="/auth/signIn" element={<LoginPage />} />
            <Route path="/auth/signUp" element={<RegisterPage />} />
            <Route path="/restaurante/:id" element={<Restaurante />} />
            <Route path="/cart/test" element={<Cart />}></Route>
            <Route path="/checkout" element={<Checkout></Checkout>}/>
          </Routes>
        </Layout>
      </Router>
    </CartListContext.Provider>
  );
};

export default App;