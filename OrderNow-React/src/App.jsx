import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Restaurantes from './Restaurantes'
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurantes" element={<Restaurantes />} />
      </Routes>
    </Router>
  )
}

export default App
