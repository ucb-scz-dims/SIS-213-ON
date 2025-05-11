require('dotenv').config();

const supertokens = require("supertokens-node");
const Dashboard = require("supertokens-node/recipe/dashboard");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const { verifySession } = require("supertokens-node/recipe/session/framework/express");

const express = require("express");
const cors = require("cors");
const { middleware, errorHandler } = require("supertokens-node/framework/express");

supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: process.env.CONECTION_URI_ST,
        apiKey: process.env.API_KEY_ST 
    },
    appInfo: {
        appName: "OrderNow",
        apiDomain: process.env.BACKEND_ST,
        websiteDomain: process.env.FRONTEND,
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init(),
        Session.init(),
        Dashboard.init(),
    ]
});

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        credentials: true,
    })
);

// 🔹 Ruta básica para verificar que el backend está vivo
app.get("/", (req, res) => {
    res.send("✅ Backend OrderNow activo y corriendo en Render");
});

app.use(middleware());

// Aquí puedes manejar tus APIs relacionadas a sesiones, etc.

app.use(errorHandler());

// Usa el puerto que Render asigna o 3001 en local
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Backend corriendo en el puerto ${PORT}`);
    console.log(`🌍 En producción visita: ${process.env.BACKEND_ST}`);
});
