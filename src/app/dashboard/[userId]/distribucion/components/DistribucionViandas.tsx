"use client";
import React, { useEffect, useState } from 'react';

export default function DistribucionViandasForm() {
    const [heladeraOrigen, setHeladeraOrigen] = useState<number|"">('');
    const [heladeraDestino, setHeladeraDestino] = useState<number|"">('');
    const [motivo, setMotivo] = useState('');
    const [fecha, setFecha] = useState('');
    const [heladerasArray, setHeladerasArray] = useState([]);
    const [mensaje, setMensaje] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [espDisponible, setEspDisponible] = useState<number|"">("");
    const [viandas, setViandas] = useState<Number[]>([]);
    const [viandasSeleccionadas, setViandasSeleccionadas] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(Number(espDisponible) < viandasSeleccionadas.length) {
            setError(true);
            setMensaje("La heladera destino no tiene espacio suficiente");
            console.log("La heladera destino no tiene espacio suficiente");
            return;
        }

        console.log({
            heladeraOrigen,
            heladeraDestino,
            motivo,
            fecha
        });
        setError(true);
        setMensaje("carga de distribuciones en desarrollo");
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
            setError(true);
        }
    }

    useEffect(() => {
        fetchData();
    },[])

    async function handleChangeHeladeraDestino(hela_id: number|string) {
        setHeladeraDestino(Number(hela_id));

        if(!hela_id) {
            setHeladeraDestino("");
            setEspDisponible("");
            return

        }
        try {
            // obtener heladera y disponiibilidad
            const heladeraResponse = await fetch(`/api/heladera?hela_id=${hela_id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!heladeraResponse.ok) {
                throw new Error(`Error HTTP: ${heladeraResponse.status}`);
            }

            
            const {heladera, capacidadOcupada} = await heladeraResponse.json();
            setEspDisponible(heladera.hela_capacidad - capacidadOcupada);
            
        } catch (error) {
            console.error("Error obteniendo los datos:", error);
            setMensaje('Error al recibir los datos de la heladera destino');
            setError(true);
        }

    }

    async function handleChangeHeladeraOrigen(hela_id: number|string) {
        setHeladeraOrigen(Number(hela_id));
        setViandas([]);

        if(!hela_id) {
            setHeladeraOrigen("");
            setViandas([]);
            return

        }
        try {
            
            // obtener viandas de esa heladera
            const viandasResponse = await fetch(`/api/donacion_vianda?hela_id=${hela_id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!viandasResponse.ok) {
                throw new Error(`Error HTTP: ${viandasResponse.status}`);
            }

            const {donaciones} = await viandasResponse.json();
            setViandas(donaciones);

        } catch (error) {
            console.error("Error obteniendo los datos:", error);
            setMensaje('Error al recibir los datos de la heladera destino');
            setError(true);
        }

    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <h2 className='text-lg font-semibold'>Distribución de Viandas</h2>
            {mensaje && <div className={`${
                        error ? 'text-red-600' : 'text-green-600'
                    }`}>{mensaje}</div>}

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
                    onChange={e => handleChangeHeladeraOrigen(Number(e.target.value))}
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

            {heladeraOrigen && <div>
                <label
                    htmlFor='viandasSeleccionadas'
                    className='block text-sm font-medium text-blue-600'
                >
                    Viandas:
                    {viandasSeleccionadas && `${viandasSeleccionadas.length} seleccionadas`}
                </label>
                <select
                    id='viandasSeleccionadas'
                    className='mt-1 p-2 border rounded-md w-full'
                    multiple 
                    value={viandasSeleccionadas}
                    onChange={e => {
                        const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
                        setViandasSeleccionadas(selectedValues);
                        console.log("selectedValues", selectedValues);
                    }}
                    required
                >
                    {viandas.map(
                        (v: any, index) => {
                            return (
                                <option key={index} value={String(v.dv_id)}>{`${v.dv_id} ${v.dv_comida}`}</option>
                            )
                        }
                    )}
                </select>
            </div>}

            <div>
                <label
                    htmlFor='heladeraDestino'
                    className='block text-sm font-medium'
                >
                    Heladera Destino:
                </label>
                <div className="text-blue-600">
                    {`Espacio disponible: ${espDisponible}`}
                </div>
                <select
                    id='heladeraDestino'
                    className='mt-1 p-2 border rounded-md w-full'
                    value={heladeraDestino}
                    onChange={e =>handleChangeHeladeraDestino(Number(e.target.value))}
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
                    disabled={
                        !heladeraOrigen &&
                        !heladeraDestino &&
                        !motivo &&
                        !fecha &&
                        heladeraOrigen == heladeraDestino
                    }
            >
                Enviar
            </button>
        </form>
    );
};
