import React from "react";
import Button from "../button/button";

const RegisterForm = ({}) => {
    return (
        /* From Uiverse.io by ahkamboh */ 
        <div class="flex items-center justify-center px-7">
        <div class="relative">
            <div class="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg"></div>
            <div id="form-container" class="bg-white p-16 rounded-lg shadow-2xl w-80 relative z-10 transform">
                <h2 id="form-title" class="text-center text-3xl font-bold mb-10 text-gray-800">Registro</h2>
        <form class="px-7 grid justify-center items-center">
            <div class="grid gap-6" id="form">
                <div class="w-full flex gap-3">
                    <input class="w-full h-12 border border-gray-800 px-3 rounded-lg" type="text" placeholder="First Name" id="firstName" name="firstName" required=""></input>
                    <input class="w-full h-12 border border-gray-800 px-3 rounded-lg" type="text" placeholder="Last Name" id="lastName" name="lastName"></input>
                </div>
                <div class="grid gap-6 w-full">
                    <input class="w-full h-12 border border-gray-800 px-3 rounded-lg" type="Email" placeholder="Email" id="email" name="email"></input>
                    <input class="w-full h-12 border border-gray-800 px-3 rounded-lg" type="date" required=""></input>
                </div>
                <div class="flex gap-3">
                    <input class="w-full h-12 border border-gray-800 px-3 rounded-lg" type="password" placeholder="Password" id="password" name="password" required=""></input>
                    <input class="w-full h-12 border border-gray-800 px-3 rounded-lg" type="password" placeholder="Confirm password" required=""></input>
                </div>
                <Button label="Submit" type="submit"/>
            </div>
        </form>
        </div>
        </div>
        </div>
    )
};

export default RegisterForm;