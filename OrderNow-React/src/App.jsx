
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
      <Home />
    </>
  )
}

export default App
