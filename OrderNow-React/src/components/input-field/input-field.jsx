import React from "react";
import PropTypes from "prop-types";

import "./input-field.css";

const InputField = ({children, type, id, required}) => {
    return (
        <div className="user-box">
            <input type={type} id={id} name={id} required={required} />
            <label>{children}</label>
        </div>
    )
};

InputField.propTypes = {
    children: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["text", "email", "password", "date", "tel"]),
    id: PropTypes.string.isRequired,
    required: PropTypes.bool,
};

InputField.defaultProps = {
    id: "Example",
    required: false,
}

export default InputField;