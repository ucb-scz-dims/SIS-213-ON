import React from 'react';

const Button = ({ text = 'Button', onClick, disabled = false, mainColor = 'blue' }) => {
  const colorVariants = {
    red:'bg-red-500 hover:bg-red-700',
    green: 'bg-green-500 hover:bg-green-700',
    blue: 'bg-blue-500 hover:bg-blue-700',
    gray: 'bg-gray-500 hover:bg-gray-700'
  }
  return (
    <button 
      onClick={onClick}
      className={`${colorVariants[mainColor]} text-white font-bold py-2 px-4 rounded-full ${disabled ? 'opacity-20' : ''}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button