'use client';
import MapaHeladeras from '@/app/dashboard/components/MapaHeladeras';
// import heladerasData from '@/data/heladeras.json';
import { useState, useEffect } from 'react';

export default function HeladerasSection(){
    // const heladerasjson = heladerasData;
    const [heladerasDB, setHeladerasDB] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/heladera", {
                    method: "GET",
                    headers: {"Content-Type": "application/json"}
                });

                if (response.ok) {
                    const {heladeras} = await response.json();
                    setHeladerasDB(
                        heladeras.map(
                            (h) => {
                                return {
                                    nombre: h.hela_nombre,
                                    lat: h.hela_latitud,
                                    lng: h.hela_longitud
                                }
                            }
                        )
                    )
                }

            } catch(error) {
                console.error("Error: ", error);
            }

        }

        fetchData();
    }, []);



    return (
        <div>
            <div>Heladeras Disponibles: </div>
            <MapaHeladeras ubicaciones={heladerasDB} mapId='heladeras' />
        </div>
    );
};
