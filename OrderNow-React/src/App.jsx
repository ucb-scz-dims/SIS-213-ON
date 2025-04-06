
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Restaurantes from './pages/Restaurantes'
import Restaurante from './pages/Restaurante';
import Layout from './pages/Layout'
import Cart from './pages/Cart.jsx'

const App = () => {
  return (
    <Router>
        <Layout>
          <Routes>
            <Route path='/' element={ <Home/> }></Route>
            <Route path="/restaurantes" element={<Restaurantes />} />
            <Route path="/restaurante/:id" element={<Restaurante />} />
            <Route path='/restaurant/:id/cart' element={ <Cart /> }></Route>
            <Route path='/cart/test' element={<Cart />}></Route>
          </Routes>
        </Layout>
      </Router>
  )
}

export default App
