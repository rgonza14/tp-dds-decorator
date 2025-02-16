'use client';
import React, { useState } from 'react';

const RegistroHeladeras: React.FC = () => {
    const userId = localStorage.getItem("userId");
    const [nombre, setNombre] = useState<string>('');
    const [direccion, setDireccion] = useState<string>('');
    const [longitud, setLongitud] = useState<number | string>('');
    const [latitud, setLatitud] = useState<number | string>('');
    const [capacidad, setCapacidad] = useState<number | string>('');
    const [fechaFuncionamiento, setFechaFuncionamiento] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');

    async function handleSubmit(e: React.FormEvent) {
        try {
            const response = await fetch("/api/heladeraDB", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cola_id: userId,
                    heladeraData: {
                        hela_nombre: nombre,
                        hela_capacidad: Number(capacidad),
                        hela_fecha_registro: new Date(fechaFuncionamiento).toISOString(),
                        hela_direccion: direccion,
                        hela_longitud: Number(longitud),
                        hela_latitud: Number(latitud)
                    }
                })
            });

            const result = await response.json();

            if (response.ok) {
                setMensaje(result.mensaje);
                setDireccion('');
                setLongitud('');
                setLatitud('');
                setNombre('');
                setCapacidad('');
                setFechaFuncionamiento('');
            } else {
                setMensaje(result.mensaje || 'Error al registrar la heladera');
            }


        } catch (error) {
            console.error('Error al registrar la heladera:', error);
            setMensaje('Error al registrar la heladera');
        }
    };

    return (
        <div className='flex justify-center mt-6'>
            <div className='w-3/4 bg-white shadow-lg rounded-lg p-6'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <h2 className='text-lg font-semibold'>
                        Registrar Heladera
                    </h2>
                    {mensaje && <div className='text-green-600'>{mensaje}</div>}{' '}
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
                    <button
                        className='mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition'
                        type='submit'
                    >
                        Registrar Heladera
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistroHeladeras;
