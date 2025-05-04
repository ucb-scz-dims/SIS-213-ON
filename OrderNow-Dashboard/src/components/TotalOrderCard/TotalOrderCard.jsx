import React from "react";

const TotalOrdersCard = ({ totalOrders, percentage }) => {
    return (
        <div className="flex flex-col items-center justify-center w-48 h-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-4">
            <span className="text-4xl font-bold text-gray-900">{totalOrders}</span>
            <span className="text-gray-500 text-sm mt-1">Pedidos Totales</span>
            {percentage !== undefined && (
                <div className="text-green-600 text-sm font-medium mt-2">
                    +{percentage}%
                </div>
            )}
        </div>
    );
};

export default TotalOrdersCard;
