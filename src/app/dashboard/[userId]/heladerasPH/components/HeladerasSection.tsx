'use client';
import MapaHeladeras from '@/app/dashboard/components/MapaHeladeras';
import { useState, useEffect } from 'react';

export default function HeladerasSection() {
    const [userId, setUserId] = useState<number|"">('');
    const [heladerasDB, setHeladerasDB] = useState([]);
    const [suscripcionesDB, setSuscripcionesDB] = useState([]);


    async function fetchHeladerasData() {
        try {
            const response = await fetch("/api/heladera", {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });

            if (response.ok) {
                const {heladeras} = await response.json();
                setHeladerasDB(
                    heladeras.map(
                        (h: any) => {
                            return {
                                nombre: h.hela_nombre,
                                lat: h.hela_latitud,
                                lng: h.hela_longitud
                            }
                        }
                    )
                );
            }

        } catch(error) {
            console.error("Error: ", error);
        }

    }

    async function fetchSuscripcionesData() {
        try {
            const id  = Number(localStorage.getItem("userId"));
            const response = await fetch(`/api/suscripcion_heladera?cola_id=${id}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });

            if (response.ok) {
                const {suscripciones} = await response.json();
                setSuscripcionesDB(suscripciones);
            }

        } catch(error) {
            console.error("Error: ", error);
        }

    }




    useEffect(() => {
        setUserId(Number(localStorage.getItem("userId")));
        fetchHeladerasData();
        fetchSuscripcionesData();
    }, []);



    return (
        <div>
            <div>Heladeras Disponibles: </div>
            <MapaHeladeras heladeras={heladerasDB} suscripciones={suscripcionesDB} mapId='heladeras' />
        </div>
    );
};
