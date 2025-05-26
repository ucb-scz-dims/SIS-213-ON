import React from 'react';
import { Headphones } from 'lucide-react';

export const HelpButton: React.FC = () => {
  return (
    <button className="flex items-center gap-2 px-4 py-2 text-base bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors">
      <Headphones className="w-6 h-6" />
      <span>¿Necesitás ayuda?</span>
    </button>
  );
};