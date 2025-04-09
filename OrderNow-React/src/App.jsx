import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VerifySesion from './pages/VerifySesion'

import Home from './pages/Home'
import Businesses from './pages/Businesses'
import Restaurante from './pages/Restaurante';
import Layout from './pages/Layout'
import Cart from './pages/Cart'
import Perfil from './pages/Perfil'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Checkout from './pages/Checkout'


const App = () => {
  return (
    <Router>
        <Layout>
          <Routes>
            <Route path='/' element={ <Home/> }></Route>
            <Route path="/restaurantes" element={<Businesses />} />
            <Route path="/restaurante/:id" element={<Restaurante />} />
            <Route path='/restaurant/:id/cart' element={<Cart />}></Route>
            <Route path="/perfil" element={<VerifySesion><Perfil /></VerifySesion>} />
            <Route path="/auth/signIn" element={<LoginPage />} />
            <Route path="/auth/signUp" element={<RegisterPage />} />
            <Route path="/restaurante/:id" element={<Restaurante />} />
            <Route path='/cart/test' element={<Cart />}></Route>
            <Route path='/checkout' element={<Checkout></Checkout>}></Route>
          </Routes>
        </Layout>
      </Router>
  )
}

export default App
