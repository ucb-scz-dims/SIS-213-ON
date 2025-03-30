import React from "react";
import PropTypes from "prop-types";

const InputField = ({type, id, placeholder, required}) => {
    return (
        <input class="w-full h-12 border border-gray-800 px-3 rounded-lg"
               type={type}
               id={id}
               name={id}
               placeholder={placeholder}
               required={required}
        ></input>
    )
};

InputField.PropTypes = {
    type: PropTypes.oneOf(["text", "email", "password", "date", "color", "number", "tel"]),
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
};

export default InputField;