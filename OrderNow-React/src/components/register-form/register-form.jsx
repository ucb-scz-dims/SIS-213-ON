import React, { useState } from "react";
import Button from "../Button/Button.jsx";
import { signUpClicked } from "../../Supertokens.jsx";
import { crearUsuario } from "../../SupaBase.jsx";
import { crearConsumer } from "../../SupaBase.jsx";

const RegisterForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        const response =  await signUpClicked(email, password);
        if(response!=null){
            const id_user = await crearUsuario(email, password, firstName, lastName, phone, 2, response);
            if(id_user != null){
                console.log(id_user);
                const id_consumer = await crearConsumer(id_user, birthDate, gender);
                if(id_consumer != null){
                    window.location.href = "/";
                    
                }else window.alert("error al crear customer en sb")
            }else window.alert("error al crear usuario en sb")
        }else window.alert("error al crear en supertokens")
    };

    return (
        <div className="max-w-md mx-auto mt-28 p-4 space-y-4 bg-white rounded-xl shadow-lg">
            <h2 className="text-lg font-bold text-center">Registro</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex gap-3">
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
                <div className="space-y-4">
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
                    <input
                        className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        pattern="^\d{8}$"
                        title="Please enter a valid 10-digit phone number"
                        required
                    />
                    <select
                        className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value={true}>Masculino</option>
                        <option value={false}>Femenino</option>
                    </select>
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
                <div className="text-center">
                    <Button label="Submit" type="submit" />
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
