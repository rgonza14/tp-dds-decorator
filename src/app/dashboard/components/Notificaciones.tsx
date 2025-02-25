'use client';
import React from 'react';
import { useState, useEffect } from 'react';

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
        <div>
            <h2>Notificaciones: </h2>
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
                notificacionesDB.map((notificacion, index) => {
                    
                    return(
                        <li key={index}>
                            {index+1}) Heladera: {notificacion.hela_nombre}
                            <ul>

                                {notificacion.susc_notif_n_viandas_disponibles &&
                                notificacion.viandasDisponibles <= notificacion.susc_notif_n_viandas_disponibles &&
                                <li>
                                    Viandas disponibles: {notificacion.viandasDisponibles}
                                </li>
                                }

                                {notificacion.susc_notif_n_viandas_faltantes &&
                                notificacion.viandasFaltantes >= notificacion.susc_notif_n_viandas_faltantes &&
                                <li>
                                    Viandas faltantes: {notificacion.viandasFaltantes}
                                </li>
                                }

                                {notificacion.susc_notif_desperfecto &&
                                notificacion.hela_estado != "activa" &&
                                <li>
                                    Estado: {notificacion.hela_estado}
                                </li>
                                }
                            </ul>
                        </li>
                    );
                })
            }
            </ul>
        </div>

    );
}