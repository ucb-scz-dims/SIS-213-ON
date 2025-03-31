
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Restaurantes from './pages/Restaurantes'
import Restaurante from './pages/Restaurante';
import Layout from './pages/Layout'
import './App.css'
import Cart from './pages/Cart.jsx'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={ <Home/> }></Route>
            <Route path="/restaurantes" element={<Restaurantes />} />
            <Route path="/restaurante/:id" element={<Restaurante />} />
            <Route path='/restaurant/:id/cart' element={ <Cart /> }></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
