import React from 'react';
import TarjetaRestaurante from '../components/TarjetaRestaurante';

const Restaurantes = () => {
  const restaurantes = [
    {
      id: 1,
      nombre: "Restaurante 01",
      descripcion: "Descripción del restaurante",
      estrellas: 4.5,
      comidas: [
        { nombre: "Comida 1", precio: 20 },
        { nombre: "Comida 2", precio: 25 },
        { nombre: "Comida 3", precio: 30 },
        { nombre: "Comida 4", precio: 35 },
        { nombre: "Comida 1", precio: 20 },
        { nombre: "Comida 2", precio: 25 },
        { nombre: "Comida 3", precio: 30 },
        { nombre: "Comida 4", precio: 35 },
      ]
    },
    {
      id: 2,
      nombre: "Restaurante 02",
      descripcion: "Otro restaurante excelente",
      estrellas: 4.0,
      comidas: [
        { nombre: "Comida A", precio: 15 },
        { nombre: "Comida B", precio: 22 },
        { nombre: "Comida C", precio: 28 },
        { nombre: "Comida D", precio: 40 },
        { nombre: "Comida A", precio: 15 },
        { nombre: "Comida B", precio: 22 },
        { nombre: "Comida C", precio: 28 },
        { nombre: "Comida D", precio: 40 },
      ]
    },
    {
      id: 3,
      nombre: "Restaurante 03",
      descripcion: "Otro restaurante",
      estrellas: 3.5,
      comidas: [
        { nombre: "Comida 1", precio: 15 },
        { nombre: "Comida 2", precio: 22 },
        { nombre: "Comida 3", precio: 28 },
        { nombre: "Comida 4", precio: 40 },
        { nombre: "Comida 5", precio: 15 },
        { nombre: "Comida 6", precio: 22 },
        { nombre: "Comida 7", precio: 28 },
        { nombre: "Comida 8", precio: 40 },
      ]
    }
  ];

  return (
    <div className="flex flex-col justify-center space-y-4">
      <h1 className="text-4xl font-bold mb-6">RESTAURANTES</h1>
      {restaurantes.map((restaurante) => (
        <TarjetaRestaurante 
          key={restaurante.id}
          id={restaurante.id}
          nombre={restaurante.nombre}
          descripcion={restaurante.descripcion}
          estrellas={restaurante.estrellas}
          comidas={restaurante.comidas}
        />
      ))}
    </div>
  );
};

export default Restaurantes;
