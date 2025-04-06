'use client';
import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword'

import { doesEmailExist } from "supertokens-web-js/recipe/emailpassword";
import { signIn } from "supertokens-web-js/recipe/emailpassword";
import { signUp } from "supertokens-web-js/recipe/emailpassword";

export function SuperTokensConfig(){
    SuperTokens.init({
        appInfo: {
            apiDomain: "http://localhost:3001",// este dominio debe contener la ruta donde se ejecutara el backend
                                               // deveria definirse un deployer independiente al deployer del front
            
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
    if (await Session.doesSessionExist()) {
        return true;
    } else {
        return false;
    }
}

export async function getUserId() {
    if (await sesionExist()) {
        return await Session.getUserId();
    } else {
        return "error con la sesion";
    }
}

export async function signUpClicked(email, password) {
    try {
        let response = await signUp({
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
                } else if (formField.id === "password") {
                    window.alert(formField.error)
                }
            })
        } else if (response.status === "SIGN_UP_NOT_ALLOWED") {
            window.alert(response.reason)
        } else {
            window.location.href = "/auth/signIn"
        }
    } catch (err) {
        if (err.isSuperTokensGeneralError === true) {
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
}

export async function signInClicked(email, password) {
    try {
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
            window.alert("Email password combination is incorrect.")
        } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
            window.alert(response.reason)
        } else {
            window.location.href = "/"
        }
    } catch (err) {
        if (err.isSuperTokensGeneralError === true) {
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
}

export async function logout () {
    await Session.signOut(); 
    window.location.href = "/auth/signIn";
}

export async function checkEmail(email) {
    try {
        let response = await doesEmailExist({email});
        if (response.doesExist) {
            //window.alert("Email already exists. Please sign in instead")
            return true;
        }
        return false;
    } catch (err) {
        if (err.isSuperTokensGeneralError === true) {
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
}