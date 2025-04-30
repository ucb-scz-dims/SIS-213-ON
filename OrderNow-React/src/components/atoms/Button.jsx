import React from "react";
import PropTypes from "prop-types";

const Button = ({
  label,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  variant = "primary",
  icon,
  "aria-label": ariaLabel
}) => {
  const getBaseClasses = () => {
    switch (variant) {
      case "quantity":
        return "size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed";
      default:
        return "cursor-pointer transition-all text-white px-6 py-2 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]";
    }
  };
  
  const getButtonClasses = () => {
    const baseClasses = getBaseClasses();
    if (variant === "quantity") {
      return `${baseClasses} ${className}`;
    }
    
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
      aria-label={ariaLabel}
    >
      {icon || label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  type: PropTypes.oneOf(["button", "submit"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "quantity"]),
  icon: PropTypes.element,
  "aria-label": PropTypes.string
};

export default Button;