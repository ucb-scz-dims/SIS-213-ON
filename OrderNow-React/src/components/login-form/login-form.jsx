import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../button/button";
import { signInClicked } from "../../Supertokens.jsx";

const LoginForm = ({ recoveryLink }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Correo:", email);
    console.log("Contraseña:", password);
    signInClicked(email, password);
    };

    return (
    /* From Uiverse.io by themrsami */
    <div className="flex items-center justify-center px-7">
        <div className="relative">
        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg"></div>
        <div id="form-container" className="bg-white p-16 rounded-lg shadow-2xl w-80 relative z-10 transform">
            <h2 id="form-title" className="text-center text-3xl font-bold mb-10 text-gray-800">Login</h2>
            <form className="grid space-y-5" onSubmit={handleSubmit}>
            <input
                className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                placeholder="Email"
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                placeholder="Password"
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit" label="Sign in"/>
            </form>
        </div>
        </div>
    </div>
    );
};

LoginForm.propTypes = {
    recoveryLink: PropTypes.string,
};

export default LoginForm;
