import React from 'react';
import { Check } from 'lucide-react';

interface OrderStatusStep {
  text: string;
  completed: boolean;
}

interface OrderStatusProps {
  steps: OrderStatusStep[];
}

export const OrderStatus: React.FC<OrderStatusProps> = ({ steps }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      {steps.map((step, index) => (
        <div 
          key={index}
          className={`p-4 flex items-center ${
            index !== steps.length - 1 ? 'border-b border-gray-200' : ''
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mr-3">
            <Check className="w-3.5 h-3.5 text-primary-600" />
          </div>
          <p className="text-gray-700">{step.text}</p>
        </div>
      ))}
    </div>
  );
};
