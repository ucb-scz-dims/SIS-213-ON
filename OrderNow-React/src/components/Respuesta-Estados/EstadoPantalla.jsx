import React, { use } from 'react';
import { useState } from 'react';

const EstadoPantalla = ({
  message = 'Definir Mensaje',
  subMessage = 'Definir sub-mensaje',
  visible = false,
  correct = true
}) => {
  const [icon, setIcon] = useState('✅');
  const [bgColor, setBgColor] = useState('#00C48C');
  if (!visible) return null;
  if(!correct){
    setIcon('⚠️');
    setBgColor('#FF4D4F');
  }

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="w-screen h-screen flex flex-col justify-center items-center text-white text-center p-4 fixed top-0 left-0 z-50"
    >
      <div className="text-6xl mb-6">{icon}</div>
      <h1 className="text-2xl font-bold">{message}</h1>
      <p className="text-md mt-2">{subMessage}</p>
    </div>
  );
};

export default EstadoPantalla;
