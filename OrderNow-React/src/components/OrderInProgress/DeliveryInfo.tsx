import React from 'react';
import { MessageCircle } from 'lucide-react';

interface DeliveryInfoProps {
  service: string;
}

export const DeliveryInfo: React.FC<DeliveryInfoProps> = ({ service }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-red-500 rounded-full p-3">
            <MessageCircle className="text-white" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Entrega a cargo de</p>
            <p className="text-lg font-medium">{service}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          <MessageCircle size={24} />
          <span>Chat</span>
        </button>
      </div>
    </div>
  );
};
