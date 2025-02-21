'use client';

import { HandCoins } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Commerce from './Commerce';
import { useEffect, useState } from 'react';

const PuntosCanjesSection = () => {
    const [userId, setUserId] = useState<number|"">('');
    
    const [puntosUser, setPuntosUser] = useState<number|"cargando..."|"Error">("cargando...");

    async function fetchPuntos() {
        try {
            const response = await fetch(`/api/puntos?cola_id=${localStorage.getItem("userId")}`, {
                method: "GET",
                headers: {
                    "content_type": "application/json"
                }
            });

            if(!response.ok) {
                setPuntosUser("Error");
                console.log(response);
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const {puntos} = await response.json();

            setPuntosUser(puntos);

        }catch (error) {
            console.error("Error obteniendo los datos:", error);
        }
    }

    useEffect(() => {
        setUserId(Number(localStorage.getItem("userId")));
        console.log("user ID = ", userId)
        fetchPuntos();
    }, []);

    return (
        <>
            <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
                <Card x-chunk='dashboard-01-chunk-0'>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Puntos acumulados
                        </CardTitle>
                        <HandCoins className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>
                            {puntosUser}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Commerce />
        </>
    );
};

export default PuntosCanjesSection;
