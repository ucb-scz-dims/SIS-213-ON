
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Restaurantes from './pages/Restaurantes'
import Restaurante from './pages/Restaurante';
import Layout from './pages/Layout'
import './App.css'

const App = () => {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurantes" element={<Restaurantes />} />
          <Route path="/restaurante/:id" element={<Restaurante />} />
        </Routes>
      </Router>
    </Layout>
  )
}

export default App
