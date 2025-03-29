import './App.css'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home/> }></Route>
          <Route path='/restaurant/:id/cart' element={ <Cart /> }></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
