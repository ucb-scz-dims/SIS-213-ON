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
        apiDomain: "https://st-backend-e1xs.onrender.com",
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
    console.log(`🌍 En producción visita: https://st-backend-e1xs.onrender.com`);
});
