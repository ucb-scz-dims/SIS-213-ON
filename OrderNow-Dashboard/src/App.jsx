import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import OrderDashboard from './pages/OrderDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<OrderDashboard/>}/>
      <Route path="/about" element={<About />} />
      
    </Routes>
  );
}

export default App;
