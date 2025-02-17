'use client';

import React, { useEffect, useState } from 'react';

export default function EdicionHeladera() {
    const userId = localStorage.getItem("userId")
    const [id, setId] = useState<number | string>('');
    const [nombre, setNombre] = useState<string>('');
    const [direccion, setDireccion] = useState<string>('');
    const [longitud, setLongitud] = useState<number | string>('');
    const [latitud, setLatitud] = useState<number | string>('');
    const [capacidad, setCapacidad] = useState<number | string>('');
    const [estado, setEstado] = useState<number | string>('');
    const [fechaFuncionamiento, setFechaFuncionamiento] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');
    const [heladerasIdArray, setHeladerasIdArray] = useState([]);



    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await fetch("/api/heladera", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    hela_id: Number(id),
                    heladeraData: {
                        hela_nombre: nombre,
                        hela_direccion: direccion,
                        hela_longitud: Number(longitud),
                        hela_latitud: Number(latitud),
                        hela_capacidad: Number(capacidad),
                        hela_fecha_registro: new Date(fechaFuncionamiento).toISOString(),
                        hela_estado: estado
                    }
                })
            });

            const result = await response.json();

            if (response.ok) {
                setMensaje("Heladera editada exitosamente");
                setId("");
                setDireccion('');
                setLongitud('');
                setLatitud('');
                setNombre('');
                setCapacidad('');
                setFechaFuncionamiento('');
                setEstado("");
            } else {
                setMensaje(result.mensaje || 'Error al editar la heladera');
            }

            
        } catch (error) {
            console.error('Error al editar la heladera:', error);
            setMensaje('Error al editar la heladera');
        }

    }

    async function handleBaja(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        try {
            const response = await fetch("/api/heladera", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    hela_id: Number(id),
                    heladeraData: {
                        hela_estado: "BAJA"
                    }
                })
            });

            const result = await response.json();

            if (response.ok) {
                setMensaje("Heladera dada de baja exitosamente");
                setId("");
                setDireccion('');
                setLongitud('');
                setLatitud('');
                setNombre('');
                setCapacidad('');
                setFechaFuncionamiento('');
                setEstado("");
            } else {
                setMensaje(result.mensaje || 'Error al editar la heladera');
            }

            
        } catch (error) {
            console.error('Error al editar la heladera:', error);
            setMensaje('Error al editar la heladera');
        }

    }

    async function handleIdChange(hela_id: number|string) {

        try {
            const response = await fetch(`/api/heladera?hela_id=${hela_id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);

            }

            const {heladera} = await response.json();
            setId(hela_id);
            setNombre(heladera.hela_nombre);
            setDireccion(heladera.hela_direccion);
            setLongitud(heladera.hela_longitud);
            setLatitud(heladera.hela_latitud);
            setCapacidad(heladera.hela_capacidad);
            setEstado(heladera.hela_estado);
            setFechaFuncionamiento(heladera.hela_fecha_registro.split("T")[0]);

        } catch (error) {
            console.error("Error obteniendo los datos:", error);
            setMensaje('Error al recibir los datos de la heladera seleccionada');
        }
    }

    async function fetchData() {
        try {
            const response = await fetch(`/api/heladera?cola_id=${userId}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);

            }

            const {heladeras} = await response.json();

            setHeladerasIdArray(heladeras);

        } catch (error) {
            console.error("Error obteniendo los datos:", error);
            setMensaje('Error al obtener los datos de las heladeras');
        }
    }

    useEffect(() => {
        fetchData();
    },[])

    return (
        <div className='flex justify-center mt-6'>
            <div className='w-3/4 bg-white shadow-lg rounded-lg p-6'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <h2 className='text-lg font-semibold'>Editar Heladera</h2>
                    {mensaje && (
                        <div className='text-green-600'>{mensaje}</div>
                    )}{' '}
                    <div>
                        <label
                            htmlFor='id'
                            className='block text-sm font-medium'
                        >
                            id:
                        </label>
                        <select
                            id='id'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={id}
                            onChange={e => handleIdChange(e.target.value)}
                            required
                        >
                            <option value="">Seleccionar id</option>
                            {heladerasIdArray.map(
                                (h, index) => {
                                    return (
                                        <option key={index} value={`${h.hela_id}`}>{`${h.hela_id} ${h.hela_nombre}`}</option>
                                    )
                                }
                            )}
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor='nombre'
                            className='block text-sm font-medium'
                        >
                            Nombre Significativo:
                        </label>
                        <input
                            type='text'
                            id='nombre'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='direccion'
                            className='block text-sm font-medium'
                        >
                            Dirección:
                        </label>
                        <input
                            type='text'
                            id='direccion'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={direccion}
                            onChange={e => setDireccion(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='longitud'
                            className='block text-sm font-medium'
                        >
                            Longitud:
                        </label>
                        <input
                            type='number'
                            id='longitud'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={longitud}
                            onChange={e => setLongitud(e.target.value)}
                            step='any'
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='latitud'
                            className='block text-sm font-medium'
                        >
                            Latitud:
                        </label>
                        <input
                            type='number'
                            id='latitud'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={latitud}
                            onChange={e => setLatitud(e.target.value)}
                            step='any'
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='capacidad'
                            className='block text-sm font-medium'
                        >
                            Capacidad (unidades de viandas):
                        </label>
                        <input
                            type='number'
                            id='capacidad'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={capacidad}
                            onChange={e => setCapacidad(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='fechaFuncionamiento'
                            className='block text-sm font-medium'
                        >
                            Fecha de Funcionamiento:
                        </label>
                        <input
                            type='date'
                            id='fechaFuncionamiento'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={fechaFuncionamiento}
                            onChange={e =>
                                setFechaFuncionamiento(e.target.value)
                            }
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='estado'
                            className='block text-sm font-medium'
                        >
                            Estado:
                        </label>
                        <input
                            type='text'
                            id='estado'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={estado}
                            onChange={e => setEstado(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        className='mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition'
                        type='submit'
                    >
                        Confirmar Edición
                    </button>
                    <button
                        className='mt-4 bg-red-600 text-white py-2 rounded-md hover:bg-blue-500 transition'
                        type='button'
                        onClick={handleBaja}
                    >
                        Dar de Baja
                    </button>
                </form>
            </div>
        </div>
    );
};


