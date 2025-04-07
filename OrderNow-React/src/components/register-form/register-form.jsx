import React, { useState } from "react";
import Button from "../Button/Button.jsx";
import { signUpClicked } from "../../Supertokens.jsx";

const RegisterForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        signUpClicked(email, password);
    };

    return (
        <div className="flex items-center justify-center px-7">
            <div className="relative">
                <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg"></div>
                <div id="form-container" className="bg-white p-16 rounded-lg shadow-2xl w-80 relative z-10 transform">
                    <h2 id="form-title" className="text-center text-3xl font-bold mb-10 text-gray-800">Registro</h2>
                    <form className="px-7 grid justify-center items-center" onSubmit={handleSubmit}>
                        <div className="grid gap-6" id="form">
                            <div className="w-full flex gap-3">
                                <input
                                    className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                                    type="text"
                                    placeholder="First Name"
                                    id="firstName"
                                    name="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                                <input
                                    className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                                    type="text"
                                    placeholder="Last Name"
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-6 w-full">
                                <input
                                    className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex gap-3">
                                <input
                                    className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <input
                                    className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button label="Submit" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
