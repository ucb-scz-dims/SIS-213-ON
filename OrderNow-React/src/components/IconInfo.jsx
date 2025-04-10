import React from 'react';

const IconInfo = ({ onClick, className = "" }) => {
  return (
    <button 
      onClick={onClick}
      className={`cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors ${className}`}
      aria-label="Mostrar información"
    >
      <svg 
        className="w-6 h-6 text-gray-800" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <path 
          stroke="currentColor" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </button>
  );
};

export default IconInfo;