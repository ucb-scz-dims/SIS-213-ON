
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './components/RegistrationForm/RegistrationForm'
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import OrderDashboard from './pages/OrderDashboard';
import Layout from './pages/Layout'
import Home from './pages/Home'
import RestaurantStatusPage from './pages/RestaurantStatusPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/orders' element={<OrderDashboard/>}/>
        <Route path='/about' element={<About />} />
        <Route path='/registration' element={<RegistrationForm/>}/>
        <Route path='/status' element={<RestaurantStatusPage/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
