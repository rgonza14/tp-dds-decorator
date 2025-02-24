'use client';
import React, { useState, useEffect } from 'react';

export default function CargaIncidente() {
    const [userId, setUserId] = useState<number|"">('');
    useEffect(() => {
        setUserId(Number(localStorage.getItem("userId")))
    },[]);

    // estados de la heladera
    const [id, setId] = useState<number | string>('');
    const [nombre, setNombre] = useState<string>('');
    const [direccion, setDireccion] = useState<string>('');
    const [longitud, setLongitud] = useState<number | "">('');
    const [latitud, setLatitud] = useState<number | "">('');
    const [capacidad, setCapacidad] = useState<number | "">('');
    const [estado, setEstado] = useState<number | string>('');
    const [fechaFuncionamiento, setFechaFuncionamiento] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');
    const [heladerasIdArray, setHeladerasIdArray] = useState([]);
    const [mostrarInfoH, setMostrarInfoH] = useState<boolean>(false);

    // estados del incidente
    const fecha: string = (new Date()).toISOString();
    const tipoFalla: string = "falla tecnica";
    const [descripcion, setDescripcion] = useState<string>("");
    const estadoIncidente: string = "pendiente";


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await fetch("/api/incidente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    hela_id: Number(id),
                    incidenteData: {
                        inc_colaborador: userId,
                        inc_tipo: tipoFalla,
                        inc_fecha_registro: fecha,
                        inc_estado: estadoIncidente,
                        inc_descripcion: descripcion

                    }
                })
            });

            const result = await response.json();

            if (response.ok) {
                setMensaje("Incidente cargado exitosamente");
                setId("");
                setDireccion('');
                setLongitud('');
                setLatitud('');
                setNombre('');
                setCapacidad('');
                setFechaFuncionamiento('');
                setEstado("");
                setDescripcion("");
            } else {
                setMensaje(result.mensaje || 'Error al cargar el incidente');
            }

            
        } catch (error) {
            console.error('Error al cargar el incidente:', error);
            setMensaje('Error al cargar el incidente');
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
                            readOnly
                            required
                        />
                    </div>

                    <button
                        className='mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition'
                        type='button'
                        onClick={() => setMostrarInfoH(!mostrarInfoH)}
                    >
                        {mostrarInfoH ? "Ocultar informacion de la heladera":"Mostrar informacion de la heladera"}
                    </button>

                    {mostrarInfoH &&
                    <div>
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
                                readOnly
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
                                readOnly
                                step='any'
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
                                readOnly
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
                                readOnly
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
                                readOnly
                                required
                            />
                        </div>
                    </div>
                    }

                    <div>
                        <label
                            htmlFor='nombre'
                            className='block text-sm font-medium'
                        >
                            Descripcion del incidente:
                        </label>
                        <textarea
                            
                            id='nombre'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            rows={4}
                            maxLength={200}
                            required
                        />
                    </div>

                    <button
                        className='mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition'
                        type='submit'
                    >
                        Cargar incidente
                    </button>
                </form>
            </div>
        </div>
    );
};


