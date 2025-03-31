import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import './App.css'
import Home from './pages/Home.jsx'
import Layout_Rest from './pages/Layout_Rest.jsx'
import NavBar from './components/layout/NavBar.jsx';


function App() {
  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/Layout_Rest' element={<Layout_Rest/>}/> 
      </Routes>  
  
    </BrowserRouter>
    </>
  )
}

export default App
