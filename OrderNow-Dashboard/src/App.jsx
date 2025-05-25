import './App.css'
import RegistrationForm from './components/RegistrationForm/RegistrationForm'
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import OrderDashboard from './pages/OrderDashboard';
import ProductForm from './components/product-form/ProductForm';
import Layout from './pages/Layout'
import Home from './pages/Home'
import RestaurantStatusPage from './pages/RestaurantStatusPage'
import Businesses from './pages/Businesses';
import Products from './pages/Products';
import OrdersDashboardContainer from './containers/OrdersDashboardContainer';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/orders' element={<OrdersDashboardContainer/>}/>
        <Route path='/about' element={<About />} />
        <Route path='/registration' element={<RegistrationForm />}/>
        <Route path='/business/:id' element={<RegistrationForm />}/>
        <Route path='/status' element={<RestaurantStatusPage/>}/>
        <Route path='/product/register' element={<ProductForm />}/>
        <Route path='/product/:id/update' element={<ProductForm/>}/>
        <Route path='/business' element={<Businesses />}/>
        <Route path='/product' element={<Products businessId={1}/>} />
      </Routes>
    </Layout>
  );
}

export default App;
