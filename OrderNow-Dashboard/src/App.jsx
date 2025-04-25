import './App.css'
import RegistrationForm from './components/RegistrationForm/RegistrationForm'
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import OrderDashboard from './pages/OrderDashboard';
import ProductForm from './components/product-form/ProductForm'

function App() {
  return (

    <Routes>
      <Route path='/' element={<OrderDashboard/>}/>
      <Route path='/about' element={<About />} />
      <Route path='/Registration' element={<RegistrationForm/>}/>
      <Route path='/register/product' element={<ProductForm />}></Route>
    </Routes>
  );
}

export default App;
