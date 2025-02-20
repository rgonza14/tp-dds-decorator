'use client';

import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

export default function DetalleTarjeta({ data }: { data: any }) {
    console.log("-->data: ",data)
    const [fields] = useState([
        { label: 'Beneficiario', value: `${data.nombre} ${data.apellido}`},
        { label: 'Número de tarjeta', value: '1234567890xa' },
        { label: 'Usos en el día', value: '1' },
        { label: 'Usos restantes', value: '3' },

        { label: 'Colaborador a cargo del tramite', value: 'Franco Martinez' }
    ]);

    const [tarjetaNro, setTarjetaNro] = useState("");

    async function fetchTarjeta() {
        try {
            const response = await fetch(`/api/tarjeta_beneficiario?psv_id=${data.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const {tarjeta} = await response.json();

            if(!response.ok) {
                console.error('Error al obtener datos de la tarjeta:');
                // setMensaje('Error al editar persona');
                // setError(true);
                return;
            }

            setTarjetaNro(tarjeta.tarb_nro);
            

        } catch (error) {
            console.error('Error al obtener datos de la tarjeta:', error);
            // setMensaje('Error al obtener datos de la tarjeta');
        }
    }

    useEffect(() => {
        fetchTarjeta();
    }, [])

    return (
        <div className='grid gap-4 py-4'>
            {fields.map((field, index) => (
                <div
                    key={index}
                    className='grid grid-cols-4 items-center gap-4'
                >
                    <Label htmlFor={field.label} className='text-right'>
                        {field.label}:
                    </Label>
                    <div className='col-span-3'>
                        <div
                            id={field.label}
                            className='h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors'
                        >
                            {field.value}
                        </div>
                        <div className='h-[1px] w-full bg-input mt-[-1px]'></div>
                    </div>
                </div>
            ))}
        </div>
    );
};