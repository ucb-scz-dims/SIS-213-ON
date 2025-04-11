import React from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessTypeCard = ({ name = "Tipo de local", bgColor = "bg-gray-100", imagePath = "ph.png", url = "#" }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${url}`);
    };


    return (
        <div onClick={handleClick} className={`w-28 md:w-40 h-24 md:h-32 ${bgColor} rounded-lg overflow-hidden relative shadow-md cursor-pointer`}>
            <div className="p-2 md:p-3">
                <p className="text-sm md:text-base font-bold text-black">{name}</p>
            </div>
            <img
                src={imagePath}
                alt="Hamburger"
                className="absolute bottom-0 right-0 w-14 md:w-20 h-14 md:h-20 object-contain"
            />
        </div>
    );
};

export default BusinessTypeCard;

