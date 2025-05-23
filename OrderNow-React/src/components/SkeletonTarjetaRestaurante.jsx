import React from 'react';

const SkeletonTarjetaRestaurante = () => {
  return (
    <div className="animate-pulse p-4 border rounded-lg shadow-md mb-4 w-186">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="flex space-x-2">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  )
}

export default SkeletonTarjetaRestaurante;
