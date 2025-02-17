"use client";
import React, { useEffect, useState } from 'react';

export default function DistribucionViandasForm() {
    const [heladeraOrigen, setHeladeraOrigen] = useState<number|"">('');
    const [heladeraDestino, setHeladeraDestino] = useState<number|"">('');
    const [cantidadViandas, setCantidadViandas] = useState<number|"">("");
    const [motivo, setMotivo] = useState('');
    const [fecha, setFecha] = useState('');
    const [heladerasArray, setHeladerasArray] = useState([]);
    const [mensaje, setMensaje] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            heladeraOrigen,
            heladeraDestino,
            cantidadViandas,
            motivo,
            fecha
        });
    };
        
    async function fetchData() {
        try {
            const response = await fetch(`/api/heladera`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);

            }

            const {heladeras} = await response.json();

            setHeladerasArray(heladeras);

        } catch (error) {
            console.error("Error obteniendo los datos:", error);
            setMensaje('Error al obtener los datos de las heladeras');
        }
    }

    useEffect(() => {
        fetchData();
    },[])

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <h2 className='text-lg font-semibold'>Distribución de Viandas</h2>

            <div>
                <label
                    htmlFor='heladeraOrigen'
                    className='block text-sm font-medium'
                >
                    Heladera Origen:
                </label>
                <select
                    id='heladeraOrigen'
                    className='mt-1 p-2 border rounded-md w-full'
                    value={heladeraOrigen}
                    onChange={e => setHeladeraOrigen(Number(e.target.value))}
                    required
                >
                    <option value="">Seleccionar heladera</option>
                    {heladerasArray.map(
                        (h: any, index) => {
                            return (
                                <option key={index} value={`${h.hela_id}`}>{`${h.hela_id} ${h.hela_nombre}`}</option>
                            )
                        }
                    )}
                </select>
            </div>

            <div>
                <label
                    htmlFor='heladeraDestino'
                    className='block text-sm font-medium'
                >
                    Heladera Destino:
                </label>
                <select
                    id='heladeraDestino'
                    className='mt-1 p-2 border rounded-md w-full'
                    value={heladeraDestino}
                    onChange={e => setHeladeraDestino(Number(e.target.value))}
                    required
                >
                    <option value="">Seleccionar heladera</option>
                    {heladerasArray.map(
                        (h: any, index) => {
                            return (
                                <option key={index} value={`${h.hela_id}`}>{`${h.hela_id} ${h.hela_nombre}`}</option>
                            )
                        }
                    )}
                </select>
            </div>

            <div>
                <label
                    htmlFor='cantidadViandas'
                    className='block text-sm font-medium'
                >
                    Cantidad de Viandas:
                </label>
                <input
                    type='number'
                    id='cantidadViandas'
                    value={cantidadViandas}
                    onChange={e => setCantidadViandas(Number(e.target.value))}
                    required
                    className='mt-1 p-2 border rounded-md w-full'
                />
            </div>

            <div>
                <label htmlFor='motivo' className='block text-sm font-medium'>
                    Motivo de la Distribución:
                </label>
                <select
                    id='motivo'
                    value={motivo}
                    onChange={e => setMotivo(e.target.value)}
                    required
                    className='mt-1 p-2 border rounded-md w-full'
                >
                    <option value=''>Seleccione un motivo</option>
                    <option value='desperfecto'>
                        Desperfecto en la heladera
                    </option>
                    <option value='faltaViandas'>
                        Falta de viandas en la heladera destino
                    </option>
                </select>
            </div>

            <div>
                <label htmlFor='fecha' className='block text-sm font-medium'>
                    Fecha de Distribución:
                </label>
                <input
                    type='date'
                    id='fecha'
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                    required
                    className='mt-1 p-2 border rounded-md w-full'
                />
            </div>

            <button
                type='submit'
                className='mt-4 bg-primary text-white py-2 rounded-md hover:bg-primary-dark'
            >
                Enviar
            </button>
        </form>
    );
};
