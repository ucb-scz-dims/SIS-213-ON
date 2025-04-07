import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import OrderDashboard from './pages/OrderDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
      <Route path='/Order' element={<OrderDashboard/>}/>
    </Routes>
  );
}

export default App;
