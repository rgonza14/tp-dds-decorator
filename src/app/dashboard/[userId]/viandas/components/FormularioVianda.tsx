'use client';
import React, { useEffect, useState } from 'react';

export default function FormularioVianda(){
    const [userId, setUserId] = useState<number|"">('');
    useEffect(() => {
        setUserId(Number(localStorage.getItem("userId")))
    },[]);


    const [comida, setComida] = useState<string>('');
    const [fechaCaducidad, setFechaCaducidad] = useState<string>('');
    const [fechaDonacion, setFechaDonacion] = useState<string>('');
    const [heladera, setHeladera] = useState<number|"">('');
    const [calorias, setCalorias] = useState<number | ''>('');
    const [peso, setPeso] = useState<number | ''>('');
    const [estado, setEstado] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [heladerasArray, setHeladerasArray] = useState([]);
    const [cantidad, setCantidad] = useState<number | ''>(1);
    const [espDisponible, setEspDisponible] = useState<number|"">("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const response = await fetch('/api/donacion_vianda', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cola_id: userId,
                    donacionViandaData: {
                        dv_heladera: Number(heladera),
                        dv_comida: comida,
                        dv_fecha_doncacion: new Date(fechaDonacion).toISOString(),
                        dv_fecha_caducidad: new Date(fechaCaducidad).toISOString(),
                        dv_calorias: Number(calorias),
                        dv_peso: Number(peso),
                        dv_estado: estado
                    },
                    cantidad: cantidad
                })
            });

            const result = await response.json();

            if (response.ok) {
                setError(false);
                setMensaje("vianda cargada correctamente");
                setComida('');
                setFechaCaducidad('');
                setFechaDonacion('');
                setHeladera('');
                setCalorias('');
                setPeso('');
                setEstado('');
            } else {
                setError(true);
                setMensaje(result.message || 'Error al enviar la vianda');
            }
        } catch (error) {
            setError(true);
            setMensaje('Error al enviar la vianda');
            console.error('Error al enviar la vianda:', error);
        }
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

    async function handleChangeHeladera(hela_id: number|string) {
        setHeladera(Number(hela_id));

        if(!hela_id) {
            setHeladera("");
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

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <h2 className='text-lg font-semibold'>Formulario de Viandas</h2>
            {mensaje && <div className={`${
                        error ? 'text-red-600' : 'text-green-600'
                    }`}>{mensaje}</div>}
            <div>
                <label
                    htmlFor='heladera'
                    className='block text-sm font-medium'
                >
                    heladera:
                </label>
                {espDisponible && <div className="text-blue-600">
                    {`Espacio disponible: ${espDisponible}`}
                </div>}
                <select
                    id='heladera'
                    className='mt-1 p-2 border rounded-md w-full'
                    value={heladera}
                    onChange={e => handleChangeHeladera(Number(e.target.value))}
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
                <label htmlFor='comida' className='block text-sm font-medium'>
                    Comida:
                </label>
                <input
                    type='text'
                    id='comida'
                    className='mt-1 p-2 border rounded-md w-full'
                    value={comida}
                    onChange={e => setComida(e.target.value)}
                    required
                />
            </div>
            <div>
                <label
                    htmlFor='fechaCaducidad'
                    className='block text-sm font-medium'
                >
                    Fecha de Caducidad:
                </label>
                <input
                    type='date'
                    id='fechaCaducidad'
                    className='mt-1 p-2 border rounded-md w-full'
                    value={fechaCaducidad}
                    onChange={e => setFechaCaducidad(e.target.value)}
                    required
                />
            </div>
            <div>
                <label
                    htmlFor='fechaDonacion'
                    className='block text-sm font-medium'
                >
                    Fecha de Donación:
                </label>
                <input
                    type='date'
                    id='fechaDonacion'
                    className='mt-1 p-2 border rounded-md w-full'
                    value={fechaDonacion}
                    onChange={e => setFechaDonacion(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor='calorias' className='block text-sm font-medium'>
                    Calorías:
                </label>
                <input
                    type='number'
                    id='calorias'
                    className='mt-1 p-2 border rounded-md w-full'
                    value={calorias}
                    onChange={e => setCalorias(Number(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor='peso' className='block text-sm font-medium'>
                    Peso:
                </label>
                <input
                    type='number'
                    id='peso'
                    className='mt-1 p-2 border rounded-md w-full'
                    value={peso}
                    onChange={e => setPeso(Number(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor='estado' className='block text-sm font-medium'>
                    Estado:
                </label>
                <select
                    id='estado'
                    className='mt-1 p-2 border rounded-md w-full'
                    value={estado}
                    onChange={e => setEstado(e.target.value)}
                >
                    <option value=''>Seleccionar estado</option>
                    <option value='pendiente_entrega'>No Entregada</option>
                    <option value='entregada'>Entregada</option>
                </select>
            </div>
            <div>
                <label htmlFor='cantidad' className='block text-sm font-medium'>
                    Cantidad:
                </label>
                <input
                    type='number'
                    id='peso'
                    className='mt-1 p-2 border rounded-md w-full'
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                />
            </div>
            <button
                className='mt-4 bg-primary text-white py-2 rounded-md hover:bg-primary-dark'
                type='submit'
                disabled={
                    !comida &&
                    !fechaCaducidad &&
                    !fechaDonacion &&
                    !heladera &&
                    !calorias &&
                    !peso &&
                    !estado &&
                    !cantidad
                }
            >
                Enviar
            </button>
        </form>
    );
};