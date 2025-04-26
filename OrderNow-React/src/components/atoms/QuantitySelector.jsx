import React, { useState, useEffect } from 'react';
import Button from './Button';

const QuantitySelector = ({ 
  quantity, 
  setQuantity, 
  minQuantity = 1, 
  maxQuantity = 99,
  onErrorChange = () => {}
}) => {
  const [error, setError] = useState('');

  useEffect(() => {
    onErrorChange(error);
  }, [error, onErrorChange]);

  useEffect(() => {
    validateQuantity(quantity);
  }, []);

  const validateQuantity = (value) => {
    if (value === '' || value === null) {
      setError(`La cantidad debe estar entre ${minQuantity} y ${maxQuantity}`);
      return false;
    }
    
    const numValue = parseInt(value, 10);
    
    if (isNaN(numValue)) {
      setError('Solo se permiten números');
      return false;
    }
    
    if (numValue < minQuantity || numValue > maxQuantity) {
      setError(`La cantidad debe estar entre ${minQuantity} y ${maxQuantity}`);
      return false;
    }
    
    setError('');
    return true;
  };

  const increment = () => {
    if (quantity === '') {
      setQuantity(1);
      validateQuantity(1);
      return;
    } 
    if (quantity < maxQuantity) {
      const newQuantity = parseInt(quantity, 10) + 1;
      setQuantity(newQuantity);
      validateQuantity(newQuantity);
    }
  };

  const decrement = () => {
    if (quantity < minQuantity) {
      return;
    }
    const newQuantity = parseInt(quantity, 10) - 1;
    setQuantity(newQuantity);
    validateQuantity(newQuantity);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    
    if (value === '') {
      setQuantity('');
      setError(`La cantidad debe estar entre ${minQuantity} y ${maxQuantity}`);
      return;
    }
    
    if (!/^\d*$/.test(value)) {
      setError('Solo se permiten números');
      return;
    }
    
    const numValue = parseInt(value, 10);
    setQuantity(value);
    validateQuantity(numValue);
  };

  const handleBlur = () => {
    const numValue = parseInt(quantity, 10);
    
    if (isNaN(numValue) || numValue < minQuantity || numValue > maxQuantity) {
      validateQuantity(quantity);
      return;
    }
    setQuantity(numValue);
    setError('');
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`py-2 px-3 inline-block bg-white border rounded-lg ${error ? 'border-red-500' : 'border-gray-200'}`}>
        <div className="flex items-center gap-x-1.5">
          <Button 
            variant="quantity"
            onClick={decrement}
            disabled={quantity <= minQuantity}
            aria-label="Disminuir"
            icon={
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
              </svg>
            }
          />
          
          <input
            className="p-0 w-10 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            style={{"-mozAppearance": "textfield"}}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleBlur}
            aria-label="Cantidad"
          />
          
          <Button 
            variant="quantity"
            onClick={increment}
            disabled={quantity >= maxQuantity}
            aria-label="Aumentar"
            icon={
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
            }
          />
        </div>
      </div>
      
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default QuantitySelector;