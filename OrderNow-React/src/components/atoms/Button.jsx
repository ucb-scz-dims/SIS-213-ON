import React from "react";
import PropTypes from "prop-types";

const Button = ({
  label,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) => {
  const baseClasses = "cursor-pointer transition-all text-white px-6 py-2 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]";
  
  const getButtonClasses = () => {
    if (disabled) {
      return `${baseClasses} bg-gray-400 border-gray-500 cursor-not-allowed hover:cursor-not-allowed`;
    }
    return `${baseClasses} bg-blue-500 border-blue-600 ${className}`;
  };

  return (
    <button 
      className={getButtonClasses()}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["button", "submit"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;