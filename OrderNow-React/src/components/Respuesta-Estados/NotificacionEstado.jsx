import React, { useState } from 'react';

const NotificationEstado = ({
  message = 'Definir mensaje - notificacion',
  bgColor = '#00C48C', // #00C48C // #FF4D4F
  icon = '✅',
  topOffset = '80px',
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      style={{
        backgroundColor: bgColor,
        top: topOffset,
      }}
      className="w-full max-w-md mx-auto py-3 px-4 flex items-center justify-between gap-3 shadow-lg rounded-md fixed left-0 right-0 z-50"
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="text-white text-lg font-bold hover:text-gray-300 transition"
      >
        ✕
      </button>
    </div>
  );
};

export default NotificationEstado;
