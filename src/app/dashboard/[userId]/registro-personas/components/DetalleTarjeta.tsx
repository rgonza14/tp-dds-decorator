'use client';

import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

export default function DetalleTarjeta({ data }: { data: any }) {
    console.log("-->data: ",data)
    const [tarjetaNro, setTarjetaNro] = useState("");
    const [usosRealizados, setUsosRealizados] = useState(0);
    const usosDiarios = 4 + 2 * data.cantMenoresACargo;
    
    const [fields] = useState([
        { label: 'Beneficiario', value: `${data.nombre} ${data.apellido}`},
        { label: 'Número de tarjeta', value: tarjetaNro },
        { label: 'Usos en el día', value: '1' },
        { label: 'Usos restantes', value: '3' },

        { label: 'Colaborador a cargo del tramite', value: 'Franco Martinez' }
    ]);


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


    async function fetchExtracciones() {
        try {
            const response = await fetch(`/api/extraccion_vianda?psv_id=${data.id}&fechaDesde=${new Date().toISOString().split("T")[0]}&fechaHasta=${new Date().toISOString().split("T")[0]}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const {extracciones} = await response.json();

            if(!response.ok) {
                console.error('Error al obtener datos de la tarjeta:');
                // setMensaje('Error al editar persona');
                // setError(true);
                return;
            }

            setUsosRealizados(extracciones.length);
            

        } catch (error) {
            console.error('Error al obtener datos de la tarjeta:', error);
            // setMensaje('Error al obtener datos de la tarjeta');
        }
    }

    useEffect(() => {
        fetchTarjeta();
        fetchExtracciones();
    }, [])

    return (
        <div className='grid gap-4 py-4'>

            <div>
                <label
                    htmlFor='beneficiario'
                    className='block text-sm font-medium'
                >
                    Beneficiario:
                </label>
                <input
                    type='text'
                    id='beneficiario'
                    className='mt-1 p-2 border rounded-md w-full'
                    value={data.nombre}
                    readOnly
                    // onChange={}
                    required
                />
            </div>

            <div>
                <label
                    htmlFor='tarjetaNro'
                    className='block text-sm font-medium'
                >
                    Número de tarjeta:
                </label>
                <input
                    type='text'
                    id='tarjetaNro'
                    className='mt-1 p-2 border rounded-md w-full'
                    value={tarjetaNro}
                    readOnly
                    // onChange={}
                    required
                />
            </div>

            <div>
                <label
                    htmlFor='usosDiarios'
                    className='block text-sm font-medium'
                >
                    Usos diarios:
                </label>
                <input
                    type='number'
                    id='usosDiarios'
                    className='mt-1 p-2 border rounded-md w-full'
                    value={usosDiarios}
                    readOnly
                    // onChange={}
                    required
                />
            </div>

            <div>
                <label
                    htmlFor='usosRealizados'
                    className='block text-sm font-medium'
                >
                    Usos realizados:
                </label>
                <input
                    type='number'
                    id='usosRealizados'
                    className='mt-1 p-2 border rounded-md w-full'
                    value={usosRealizados}
                    readOnly
                    // onChange={}
                    required
                />
            </div>

            <div>
                <label
                    htmlFor='usosRestantes'
                    className='block text-sm font-medium'
                >
                    Usos restantes:
                </label>
                <input
                    type='number'
                    id='usosRestantes'
                    className='mt-1 p-2 border rounded-md w-full'
                    value={usosDiarios - usosRealizados}
                    readOnly
                    // onChange={}
                    required
                />
            </div>

        </div>
    );
};