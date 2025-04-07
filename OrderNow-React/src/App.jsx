import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VerifySesion from './pages/VerifySesion.jsx'

import Home from './pages/Home'
import Businesses from './pages/Businesses.jsx'
import Restaurante from './pages/Restaurante';
import Layout from './pages/Layout'
import Cart from './pages/Cart.jsx'
import Perfil from './pages/Perfil.jsx'
import LoginForm from './components/login-form/login-form.jsx'
import RegisterForm from './components/register-form/register-form.jsx'


const App = () => {
  return (
    <Router>
        <Layout>
          <Routes>
            <Route path='/' element={ <Home/> }></Route>
            <Route path="/restaurantes" element={<Restaurantes />} />
            <Route path="/restaurantes" element={<Businesses />} />
            <Route path="/perfil" element={<VerifySesion><Perfil /></VerifySesion>} />
            <Route path="/auth/signIn" element={<LoginForm />} />
            <Route path="/auth/signUp" element={<RegisterForm />} />
            <Route path="/restaurante/:id" element={<Restaurante />} />
            <Route path='/restaurant/:id/cart' element={ <Cart /> }></Route>
          </Routes>
        </Layout>
      </Router>
  )
}

export default App
