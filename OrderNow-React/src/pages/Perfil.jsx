import React, { useState, useEffect } from "react";
import { logout } from "../Supertokens";
import {getUserId} from "../Supertokens";

const Perfil = () => {
    const handleLogout = () => {
        console.log("Cerrar sesión");
        logout();
    };
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const id = await getUserId();
                setUserId(id);
            } catch (error) {
                console.error("Error obteniendo el userId", error);
            }
        };
        
        fetchUserId();
    }, []); 

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Bienvenido, {userId ? userId : "Cargando..."}</h2>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
}

export default Perfil

