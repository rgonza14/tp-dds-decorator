'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import styles from './styles/homePage.module.css';

export default function Notificaciones() {
    const [userId, setUserId] = useState<number|"">('');
    const [notificacionesDB, setNotificacionesDB] = useState<any[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [mensaje, setMensaje] = useState<string>("");

    async function fetchNotificacionesData() {
        try {
            console.log(`fetch /api/notificaciones?cola_id=${Number(localStorage.getItem("userId"))}`);
            const response = await fetch(`/api/notificaciones?cola_id=${Number(localStorage.getItem("userId"))}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });

            if(response.ok) {
                const {notificaciones} = await response.json();
                setError(false);
                setMensaje("");
                setNotificacionesDB(notificaciones);
            } else {
                setError(true);
                setMensaje("Error: no se recibieron las notificaciones");

            }

        } catch(error) {
            console.error("Error: ", error);
        }
    }

    useEffect(() => {
        setUserId(Number(localStorage.getItem("userId")));
        fetchNotificacionesData();
    }, []);
    return (
        <section className={styles.section}>
            
            <h1 className={styles.title}>
                {notificacionesDB.length>0?"🔔Notificaciones🔔":"Notificaciones"}
                </h1>
            {mensaje && (
                <div
                    className={`text-lg font-semibold text-center mb-2 ${
                        error ? 'text-red-600' : 'text-green-600'
                    }`}
                >
                    {mensaje}
                </div>
            )}
            <ul>
            {
                procesarNotificaciones(notificacionesDB).map((notif, index) => {
                    return (<li key={index}>
                        ❗{notif}
                    </li>)
                })
            }
            </ul>
        </section>

    );
}



function procesarNotificaciones(notificacionesData: any): string[] {
    const notificaciones: string[] = [];

    notificacionesData.forEach((notif: any) => {
        
        if(
            notif.susc_notif_n_viandas_disponibles !== null &&
            notif.viandasDisponibles <= notif.susc_notif_n_viandas_disponibles
        ) {
            notificaciones.push(`Heladera[${notif.hela_id}] "${notif.hela_nombre}": viandas disponibles: ${notif.viandasDisponibles}`);
        }
        
        if(
            notif.susc_notif_n_viandas_faltantes !== null &&
            notif.viandasFaltantes >= notif.susc_notif_n_viandas_faltantes
        ) {
            notificaciones.push(`Heladera[${notif.hela_id}] "${notif.hela_nombre}": viandas faltantes: ${notif.viandasFaltantes}`);
        }
        
        if(
            notif.susc_notif_desperfecto &&
            notif.hela_estado !==  "activa"

        ) {
            notificaciones.push(`Heladera[${notif.hela_id}] "${notif.hela_nombre}": estado: ${notif.hela_estado}`);
        }

    });

    return notificaciones;
}