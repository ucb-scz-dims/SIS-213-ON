import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import OrderDashboard from './pages/OrderDashboard';

function App() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path='/Order' element={<OrderDashboard/>}/>
    </Routes>
  );
}

export default App;
