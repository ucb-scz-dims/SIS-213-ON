import React, { useState } from "react";
import Button from "../atoms/Button";
import { signUpClicked } from "../../Supertokens.jsx";
import { checkEmail } from "../../Supertokens.jsx";
import { CreateUser } from "../../SupaBase.jsx";
import { CreateConsumer } from "../../SupaBase.jsx";
import { Link } from "react-router-dom";

const RegisterForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");

    const correctResponse = (response, message) => {
        if(response != null && response.toString() != "" && response != undefined) return true;
        window.alert("registro no completado en " + message +", reportanos este error.");
        return false;
    }
    const isAdult = (birthDateStr) => {
        const birthDate = new Date(birthDateStr);
        const today = new Date();
    
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
    
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            return age - 1 >= 18;
        }
    
        return age >= 18;
    };
    const validate = () => {
        if (!firstName.trim() || !email.trim() || !password || !confirmPassword || !phone || !birthDate || !gender) {
            return "Todos los campos deben ser completados.";
        }
        if (!checkEmail(email)) return "El correo ya existe, inicia sesion.";
        if (password !== confirmPassword) return "contraseñas no coinciden.";
        const phoneRegex = /^\d{8}$/;
        if (!phoneRegex.test(phone)) return "El número de teléfono debe tener 8 dígitos.";
        if (isAdult(birthDate)) return "El usuario NO puede ser un menor de edad";
        return "correct";
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = validate();
        if(result == "correct"){
            const registro_st =  await signUpClicked(email, password);
            if(!correctResponse(registro_st, "supertokens")) return;
            const registro_sb_user = await CreateUser(email, password, firstName, lastName, phone, 2, registro_st);
            if(!correctResponse(registro_sb_user, "supabase-user")) return;
            const registro_sb_consumer = await CreateConsumer(registro_sb_user, birthDate, gender);
            if(!correctResponse(registro_sb_consumer, "supabase-consumer")) return;
            window.location.href = "/";
        }
        window.alert(result);
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
                <p className="mt-4 text-sm text-gray-600 text-center">
                    ¿Ya estas registrado?{" "}
                    <Link to="/auth/signIn" className="text-blue-600 hover:underline font-semibold">
                        Iniciar Sesion
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
