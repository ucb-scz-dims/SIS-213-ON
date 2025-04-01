import React from "react";
import PropTypes from "prop-types";
import Button from "../button/button";

const LoginForm = ({submitAction, recoveryLink}) => {
    return (
        /* From Uiverse.io by themrsami */ 
        <div class="flex items-center justify-center px-7">
            <div class="relative">
                <div class="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg"></div>
                <div id="form-container" class="bg-white p-16 rounded-lg shadow-2xl w-80 relative z-10 transform">
                    <h2 id="form-title" class="text-center text-3xl font-bold mb-10 text-gray-800">Login</h2>
                    <form class="grid space-y-5" action={submitAction}>
                        <input class="w-full h-12 border border-gray-800 px-3 rounded-lg" placeholder="Email" id="email" name="email" type="email"></input>
                        <input class="w-full h-12 border border-gray-800 px-3 rounded-lg" placeholder="Password" id="password" name="password" type="password"></input>
                        <button class="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:duration-500">Sign in</button>
                        <Button label="Submit" type="submit"/>
                        <a class="text-blue-500 hover:text-blue-800 text-sm" href={recoveryLink}>Forgot Password?</a>
                    </form>
                </div>
            </div>
        </div>
    )
};

LoginForm.PropTypes = {
    submitAction: PropTypes.string,
    recoveryLink: PropTypes.string,
};

export default LoginForm;