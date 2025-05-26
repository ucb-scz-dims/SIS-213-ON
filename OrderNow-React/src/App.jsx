import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerifySesion from "./pages/VerifySesion";

import Home from "./pages/Home";
import Businesses from "./pages/Businesses";
import Business from "./pages/Business";
import Layout from "./pages/Layout";
import Cart from "./pages/Cart";
import Perfil from "./pages/Perfil";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./context/CartContext";
import OrderInProgress from "./pages/OrderInProgress";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/restaurantes" element={<Businesses />} />
            <Route path="/restaurante/:id" element={<Business />} />
            <Route path="/restaurante/:id/cart" element={<Cart />}/>
            <Route path="/perfil" element={<VerifySesion><Perfil /></VerifySesion>}/>
            <Route path="/auth/signIn" element={<LoginPage />} />
            <Route path="/auth/signUp" element={<RegisterPage />} />
            <Route path="/cart/test" element={<Cart />}></Route>
            <Route path="/checkout" element={<VerifySesion><Checkout/></VerifySesion>}/>
            <Route path="/orderprogress" element={<OrderInProgress />}/>
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
};

export default App;