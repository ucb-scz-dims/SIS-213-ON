import React from "react";

const OrderCardSkeleton = () =>
{
    return(
        <div className="animate-pulse p-4 shadow-md mb-4 w-340 h-18 bg-white flex items-center">
            <div className="mr-70 flex items-center">
                <div className="bg-gray-400 w-8 h-8 rounded-xl mr-20"></div>
                <div className="bg-gray-400 w-25 h-8 rounded-xl mr-6"></div>
                <div className="bg-gray-400 w-25 h-5 rounded-xl"></div>
            </div>
            <div className="mr-10 flex items-center">
                <div className="bg-gray-400 w-25 h-5 rounded-xl mr-4"></div>
                <div className="bg-gray-400 w-20 h-8 rounded-xl mr-6"></div>
                <div className="bg-gray-400 w-25 h-8 rounded-xl"></div>
            </div>
        </div>

    );
};

export default OrderCardSkeleton;