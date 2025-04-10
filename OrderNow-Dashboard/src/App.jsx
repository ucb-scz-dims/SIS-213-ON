
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './components/RegistrationForm/RegistrationForm'
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import OrderDashboard from './pages/OrderDashboard';

function App() {
  return (

    <Routes>
      <Route path="/about" element={<About />} />
      <Route path='/Order' element={<OrderDashboard/>}/>
      <Route path='/Registration' element={<RegistrationForm/>}/>
    </Routes>
  );
}

export default App;
