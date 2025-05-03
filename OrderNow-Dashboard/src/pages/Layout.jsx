import React from "react";
import { useState, useEffect } from "react";
import Notification from "../components/Notification/Notification";
import getSupaBaseClient from "../supabase/supabase-client";



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
                    filter: 'business_id=eq.1'
                },
                (payload) => {
                    console.log('Pedido recibido: ', payload.new);
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
            <Notification
                message="Tienes nuevos pedidos"
                type="info"
                full={false}
                visible={showNotification}
            />
            {children}
        </div>
    );
}


export default Layout;