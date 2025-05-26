import React from 'react';
import { MapPin, Pencil } from 'lucide-react';

interface AddressInfoProps {
  address: string;
}
export const AddressInfo: React.FC<AddressInfoProps> = ({ address }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <MapPin className="text-purple-600" size={24} />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-500">Dirección de envío</p>
            <p className="text-lg text-gray-700">{address}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
          <Pencil size={24} />
          <span>Notas</span>
        </button>
      </div>
    </div>
  );
};