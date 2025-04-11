import React from 'react';

const Rating = ({ rating }) => {
  if (rating === null) {
    return <span className="text-sm text-gray-500">No hay reseñas</span>;
  }

  const renderStar = (index) => {
    const roundedRating = Math.round(rating * 2) / 2;
    const isHalf = roundedRating - index === 0.5;
    const isFull = roundedRating - index >= 1;

    return (
      <svg
        key={index}
        className={`w-4 h-4 ms-1 ${
          isFull || isHalf ? 'text-amber-400' : 'text-gray-300 dark:text-gray-500'
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22 20"
      >
        {isHalf ? (
          <defs>
            <linearGradient id={`half-${index}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="rgb(209 213 219)" />
            </linearGradient>
          </defs>
        ) : null}
        <path
          fill={isHalf ? `url(#half-${index})` : 'currentColor'}
          d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
        />
      </svg>
    );
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map((index) => renderStar(index))}
      </div>
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {rating.toFixed(2)}
      </span>
    </div>
  );
};

export default Rating;