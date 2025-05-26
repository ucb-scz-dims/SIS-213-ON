import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DeliveryTrackerProps {
  estimatedTime: {
    start: string;
    end: string;
  };
  progress: number;
  status: string;
}

export const DeliveryTracker: React.FC<DeliveryTrackerProps> = ({ 
  estimatedTime, 
  progress, 
  status 
}) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4">
        <h3 className="text-sm text-gray-500">Entrega estimada</h3>
        <p className="text-xl font-medium mt-1">{estimatedTime.start} - {estimatedTime.end}</p>
        
        <div className="flex w-full h-2 mt-4 bg-gray-200 rounded-full overflow-hidden">
          <div className="bg-blue-500 w-1/4 rounded-l-full"></div>
          <div className="bg-blue-500 w-1/4"></div>
          <div className="bg-gray-300 w-[15%]"></div>
          <div className="bg-blue-500 w-[10%]"></div>
          <div className="bg-gray-300 w-[15%]"></div>
          <div className="bg-gray-300 w-[10%] rounded-r-full"></div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-medium">{status}</p>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
