const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const { verifySession } = require("supertokens-node/recipe/session/framework/express");

const express = require("express");
const cors = require("cors");
const { middleware, errorHandler } = require("supertokens-node/framework/express");

supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "https://st-dev-4becb8e0-0546-11f0-9c21-311d8840c7c1.aws.supertokens.io",
        apiKey: "PaqML7h7LMxiijTM7ZedJJZddf"
    },
    appInfo: {
        appName: "OrderNow",
        apiDomain: "http://localhost:3001", // este dominio debe contener la ruta donde se ejecutara el backend
                                            // deveria definirse un deployer independiente al deployer del front 
        websiteDomain: "https://ordernowapp-sis213.netlify.app/",
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init(),
        Session.init()
    ]
});

const app = express();

app.use(
    cors({
        origin: "https://ordernowapp-sis213.netlify.app/",
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        credentials: true,
    })
);

app.use(middleware());

// -------- APIs -------- //

// -------- en este apartado se pueden manejar apis en relacion a las sesiones -------- //

app.use(errorHandler());

app.listen(3001, () => console.log("Backend corriendo en http://localhost:3001"));
