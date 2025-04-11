import React from 'react';

const CardSlider = ({ children }) => {
    return (
        <>
            <div className="flex justify-center w-full ">
                <div className="w-full max-w-3xl overflow-x-auto p-0.5 rounded-lg ">
                    <div className="flex flex-row space-x-2 md:space-x-4 p-2 md:p-4 min-w-max">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardSlider;

