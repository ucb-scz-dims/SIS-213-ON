import React, { useEffect, useState } from 'react';

const EstadoPantalla = ({
  message = 'Definir Mensaje',
  subMessage = 'Definir sub-mensaje',
  icon = '✅',
  bgColor = '#00C48C', // #00C48C // #FF4D4F
  duration = 3000
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

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
