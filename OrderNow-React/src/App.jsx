import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Business from './pages/Business'
import Restaurante from './pages/Restaurante';
import Layout from './pages/Layout'
import Cart from './pages/Cart.jsx'

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path="/business" element={<Business />} />
          <Route path="/restaurante/:id" element={<Restaurante />} />
          <Route path='/restaurant/:id/cart' element={<Cart />}></Route>
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
