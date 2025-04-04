import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Session from "supertokens-web-js/recipe/session";

export default function VerifySesion({ children }) {
    const [loading, setLoading] = useState(true);
    const [sessionExists, setSessionExists] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const exists = await Session.doesSessionExist();
                setSessionExists(exists);
                setLoading(false);

                if (!exists) {
                    navigate("/auth/signIn");
                }
            } catch (err) {
                console.error("Error checking session", err);
                setLoading(false);
            }
        };

        checkSession();
    }, [navigate]);

    if (loading) {
        return <h1>Cargando...</h1>;
    }
    return sessionExists ? children : null;
}
