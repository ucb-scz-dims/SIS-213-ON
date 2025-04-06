
import React from 'react';
import Restuarantes from './Restaurantes'


const Home = () => {
  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-4xl font-bold mb-6">HOME PAGE</h1>
      <Restuarantes />
    </div>
  );
};

export default Home;

