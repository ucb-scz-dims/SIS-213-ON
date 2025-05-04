// 'use client';
import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword'

import { doesEmailExist } from "supertokens-web-js/recipe/emailpassword";
import { signIn } from "supertokens-web-js/recipe/emailpassword";
import { signUp } from "supertokens-web-js/recipe/emailpassword";

export function SuperTokensConfig(){
    SuperTokens.init({
        appInfo: {
            apiDomain: import.meta.env.VITE_BACKEND_ST,
            apiBasePath: "/auth",
            appName: "OrderNow",
        },
        recipeList: [
            Session.init(),
            EmailPassword.init(),
        ],
    });
};


// servicios

export async function sesionExist() {
    try{
        return await Session.doesSessionExist();
    }catch(e){
        window.alert("error consumiendo sesion de st.");
        console.log(e);
        return false;
    }
}

export async function getUserId() {
    try{
        if(await sesionExist()) return await Session.getUserId;
        return null;
    }catch(e){
        window.alert("error consumiendo userId de st. UserId");
        console.log(e);
        return null;
    }
}

export async function signUpClicked(email, password) {
    try {
        let response = await signUp({
            formFields: [
                { id: "email", value: email },
                { id: "password", value: password }
            ]
        });

        if (response.status === "FIELD_ERROR") {
            let message = "";
            response.formFields.forEach(formField => {
                if (formField.error && formField.error.trim() !== "") {
                    message += `Error en ${formField.id}: ${formField.error}\n`;
                }
            });
            if (message !== "") {
                window.alert(message);
            }
        } 
        else if (response.status === "SIGN_UP_NOT_ALLOWED") {
            window.alert(response.reason);
        }
        else if(checkEmail(email)){
            window.alert("correo ya registrado.");
        } 
        else {
            return response.user.id;
        }
        return null;
    } catch (err) {
        if (err.isSuperTokensGeneralError === true) {
            window.alert(err.message);
        } else {
            window.alert("error registrando en st. Register");
        }
        return null;
    }
}


export async function signInClicked(email, password) {
    try{
        let response = await signIn({
            formFields: [{
                id: "email",
                value: email
            }, {
                id: "password",
                value: password
            }]
        })
        if (response.status === "FIELD_ERROR") {
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    window.alert(formField.error)
                }
            })
        } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
            window.alert("Combinacion de datos incorrectos.");
        } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
            window.alert(response.reason)
        } else {
            return true;
        }
        return false;
    } catch (err) {
        if (err.isSuperTokensGeneralError === true) {
            window.alert(err.message);
        } else {
            window.alert("error iniciando sesion en st. SignIn");
        }
        return false;
    }
}

export async function logout () {
    await Session.signOut(); 
    window.location.href = "/auth/signIn";
}

export async function checkEmail(email) {
    try {
        let response = await doesEmailExist({email});
        if (response.doesExist) return true;
        return false;
    } catch (err) {
        if (err.isSuperTokensGeneralError === true) {
            window.alert(err.message);
        } else {
            window.alert("error revisando email en st.");
        }
        return false;
    }
}