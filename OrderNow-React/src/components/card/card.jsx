import React from "react";
import PropTypes from "prop-types";

const Card = ({path, alt, fit, title, desc, price, disabled, handleClick}) => {
    return (
        <div
            className="w-72 h-40 flex flex-col justify-center gap-2 bg-neutral-50 rounded-lg shadow p-2 disabled:pointer-events-none" disabled={disabled}
        >
        <div class="flex gap-2">
            <img className={"bg-neutral-500 w-24 h-24 shrink-0 rounded-lg " + fit} alt={alt} src={path} title={alt}/>
            <div className="flex flex-col">
            <span className="font-bold text-neutral-700 italic">{title}</span>
            <p className="line-clamp-3">
                {desc}
            </p>
            </div>
        </div>
        <button
            disabled={disabled}
            className="enabled:hover:bg-indigo-700 bg-indigo-500 font-bold text-neutral-50 rounded p-2 disabled:bg-indigo-300 disabled:pointer-events-none"
            onClick={handleClick}
        >
            {price}
        </button>
        </div>
    )
};

Card.propTypes = {
    path: PropTypes.string.isRequired,
    alt: PropTypes.string,
    fit: PropTypes.oneOf(["object-cover", "object-contain", "object-fill", "object-scale-down", "object-none"]),
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    price: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};

export default Card;