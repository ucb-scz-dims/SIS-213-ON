import React from "react";
import { useState, useEffect } from "react";
import Notification from "../components/Notification/Notification";
import getSupaBaseClient from "../supabase/supabase-client";
import NavBar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer';



const Layout = ({children}) => {

    const [showNotification, setShowNotification] = useState(false);

    const createChannel = () => {
        const supabaseClient = getSupaBaseClient();
        const channel = supabaseClient
            .channel('com_db_changes')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'com',
                    table: 'orders',
                    //TODO: Insertar el ID del restaurante una vez integrado el inicio de sesion
                },
                (_payload) => {
                    if(!showNotification) {
                        setShowNotification(true);
    
                        setTimeout(() => {
                            setShowNotification(false);
                        }, 3000);
                    }

                }
            );
    
        return channel;
    }
   
    useEffect(() => {
        createChannel().subscribe();
    }, [])

    return(
        <div>
            <NavBar/>
            <Notification
                message="Tienes nuevos pedidos"
                type="info"
                full={false}
                visible={showNotification}
            />
            {children}
            <Footer />
        </div>
    );
}