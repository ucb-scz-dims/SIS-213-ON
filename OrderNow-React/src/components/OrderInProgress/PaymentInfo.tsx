import React from 'react';
import { Receipt, DollarSign } from 'lucide-react';

interface PaymentInfoProps {
  method: string;
  amount: number;
}

export const PaymentInfo: React.FC<PaymentInfoProps> = ({ method, amount }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
            <DollarSign size={24} className="text-gray-800" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">{method}</p>
            <p className="text-xl font-semibold">${amount.toLocaleString()}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Receipt size={24} />
          <span>Detalle</span>
        </button>
      </div>
    </div>
  );
};
