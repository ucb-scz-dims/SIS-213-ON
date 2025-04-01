import React from 'react';
import { useParams } from 'react-router-dom';

const Restaurante = () => {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Restaurante ID: {id}</h1>
      <p>Aquí se mostrarán los detalles completos del restaurante con ID {id}.</p>
    </div>
  );
};

export default Restaurante;
