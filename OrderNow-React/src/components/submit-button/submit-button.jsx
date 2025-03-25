import React from "react";
import PropTypes from "prop-types";

import "./submit-button.css";

const getStyles = (...args) => ["button", ...args].filter(Boolean).join(" ")

const SubmitButton = ({children}) => {
    return (
        <input type="submit" value={children}/>
    )
};

SubmitButton.propTypes = {
    children: PropTypes.string.isRequired,
};

export default SubmitButton;