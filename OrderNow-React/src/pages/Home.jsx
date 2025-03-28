import React from 'react';
import BotonRestaurantes from './BotonRestaurantes'; // Asegúrate de que la ruta sea correcta

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">HOME PAGE</h1>
      <BotonRestaurantes />
    </div>
  );
};

export default Home;
