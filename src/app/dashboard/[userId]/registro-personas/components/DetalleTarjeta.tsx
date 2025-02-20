'use client';
import { useEffect, useState } from 'react';

export default function DetalleTarjeta({ data }: { data: any }) {

    const [userId, setUserId] = useState<number|"">("");
    useEffect(() => {
        setUserId(Number(localStorage.getItem("userId")))
    },[]);
    const [tarjetaNro, setTarjetaNro] = useState("");
    const [nuevaTarjetaNro, setNuevaTarjetaNro] = useState("");
    const [usosRealizados, setUsosRealizados] = useState(0);
    const usosDiarios = 4 + 2 * data.cantMenoresACargo;


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

    async function handleSubmit(e: React.FormEvent) {
        try {
            const response = await fetch("/api/tarjeta_beneficiario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tarjeta_nro: nuevaTarjetaNro,
                    cola_id: userId,
                    psv_id: data.id,
                    fecha: (new Date()).toISOString()
                })
            });

            const result = await response.json();

            if(response.ok) {
                console.log(result.message);
                // setMensaje(result.message);
                // setError(false);

            } else {
                console.error(result.message);
                // setMensaje(result.message);
                // setError(false);

            }
        } catch (error) {
            console.error('Error al editar persona:', error);
            // setMensaje('Error al editar persona');
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

            {Boolean(tarjetaNro) && <div>

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
            </div>}

            {Boolean(!tarjetaNro) && <div>
                La persona no tiene asociada una tarjeta.
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <h2 className='text-lg font-semibold'>
                        Asociar Tarjeta
                    </h2>

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
                        value={nuevaTarjetaNro}
                        onChange={e => setNuevaTarjetaNro(e.target.value)}
                        required
                    />
                </div>

                    <button
                        className='mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition'
                        type='submit'
                    >
                        Asociar Tarjeta
                    </button>
                    </form>

            </div>}

        </div>
    );
};