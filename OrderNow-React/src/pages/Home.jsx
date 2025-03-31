import React from 'react'
import Layout from './Layout'
import { Link } from 'react-router-dom';

function Home() {
  let restaurantes = ["Burger B", "MacFrio", "Pollo KI"];

  return (
    <>
      <Layout>
      <h1 className="text-x1 font-bold">Hello TailwindCSS with Vite + react</h1>
      <h2>Restaurantes</h2>
      <ul>
        {restaurantes.map((restaurante, index) => (
          <><li key={index}></li><Link to='/Layout_Rest' className="text-blue-500 hover:underline">
            {restaurante}
          </Link></>
        ))}
      </ul>
      </Layout>
    </>
  )
}

export default Home
