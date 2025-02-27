'use client';
import MapaHeladeras from '@/app/dashboard/components/MapaHeladeras';
import { useState, useEffect } from 'react';

export default function HeladerasSection({cola_id}: {cola_id?: number|string}) {
    const [userId, setUserId] = useState<number|"">('');
    const [heladerasDB, setHeladerasDB] = useState([]);
    const [suscripcionesDB, setSuscripcionesDB] = useState([]);


    async function fetchHeladerasData() {
        try {
            var fetchInput = "/api/heladera"
            if (cola_id) {
                fetchInput = fetchInput + `?cola_id=${cola_id}`
            }
            const response = await fetch(fetchInput, {
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

    useEffect(() => {
        setUserId(Number(localStorage.getItem("userId")));
        fetchHeladerasData();
    }, []);



    return (
        <div>
            <div>Heladeras Disponibles: </div>
            <MapaHeladeras heladeras={heladerasDB} mapId='heladeras' />
        </div>
    );
};
