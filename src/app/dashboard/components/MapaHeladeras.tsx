import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import styles from './styles/mapa.module.css';

const loadLeaflet = async () => {
    const L = await import('leaflet');
    return L;
};

const Mapa: React.FC<{
    heladeras: { lat: number; lng: number; nombre: string }[];
    suscripciones: any[];
    mapId: string;
}> = ({ heladeras, suscripciones, mapId }) => {
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        const initializeMap = async () => {
            const L = await loadLeaflet();

            if (!mapRef.current) {
                mapRef.current = L.map(mapId).setView(
                    [heladeras[0]?.lat || 0, heladeras[0]?.lng || 0],
                    12
                );

                L.tileLayer(
                    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    {
                        maxZoom: 19
                    }
                ).addTo(mapRef.current);

                const markerIcon = L.icon({
                    iconUrl:
                        'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowUrl:
                        'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
                    shadowSize: [41, 41],
                });

                heladeras.forEach(heladera => {
                    if (
                        heladera.lat !== undefined &&
                        heladera.lng !== undefined
                    ) {
                        L.marker([heladera.lat, heladera.lng], {
                            icon: markerIcon
                        })
                            .addTo(mapRef?.current)
                            .bindPopup(heladera.nombre);
                    }
                });
            }
        };

        if (typeof window !== 'undefined') {
            initializeMap();
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [heladeras, mapId]);

    return <div id={mapId} className={styles.mapContainer}></div>;
};

export default Mapa;
