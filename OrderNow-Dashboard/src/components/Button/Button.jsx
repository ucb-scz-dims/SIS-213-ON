import React from 'react';

const Button = ({ children, className, text, onClick, id, disabled = false}) => {
  const colorVariants = {
    red:'bg-red-500 hover:bg-red-700',
    green: 'bg-green-500 hover:bg-green-700',
    blue: 'bg-blue-500 hover:bg-blue-700',
    gray: 'bg-gray-500 hover:bg-gray-700',
    white: 'bg-white-500 hover:bg-white-700',
  }

  const textColorVariants = {
    black: 'text-black',
    white: 'text-white',
  }

  const paddingVariants = {
    nt: 'py-0 px-0',
    sm: 'py-1 px-2',
    md: 'py-2 px-4',
    lg: 'py-4 px-8'
  }


  return (
    <button 
      onClick={onClick}
      className={`${className}`}
      disabled={disabled}
      id={id}
    >
      {text}
      {children}
    </button>
  );
};

export default Button