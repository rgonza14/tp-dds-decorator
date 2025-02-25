import React, { useEffect, useState } from 'react';
import MapaHeladeras from './MapaHeladeras';

const RecomendacionesHeladeras: React.FC = () => {
    const [latitud, setLatitud] = useState<string>('');
    const [longitud, setLongitud] = useState<string>('');
    const [radio, setRadio] = useState<string>('');
    const [recomendaciones, setRecomendaciones] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [ubicacionesRecomendadas, setUbicacionesRecomendadas] = useState<any>(
        []
    );

    useEffect(() => {
        const nuevasUbicaciones = recomendaciones.map(
            (recomendacion, index) => ({
                lat: recomendacion.latitud,
                lng: recomendacion.longitud,
                nombre: `Recomendación ${index + 1}`
            })
        );

        setUbicacionesRecomendadas(nuevasUbicaciones);
    }, [recomendaciones]);

    const obtenerRecomendaciones = async () => {
        try {
            setError('');
            const response = await fetch('/api/recomendaciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    latitud: parseFloat(latitud),
                    longitud: parseFloat(longitud),
                    radio: parseFloat(radio)
                })
            });

            if (!response.ok) {
                throw new Error('Error al obtener recomendaciones');
            }

            const data = await response.json();
            setRecomendaciones(data.recomendaciones);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        obtenerRecomendaciones();
    };

    return (
        <div className='flex justify-center mt-6'>
            <div className='w-full bg-white shadow-lg rounded-lg p-6'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    {error && <p className='text-red-600'>{error}</p>}

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
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='radio'
                            className='block text-sm font-medium'
                        >
                            Radio (en metros):
                        </label>
                        <input
                            type='number'
                            id='radio'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={radio}
                            onChange={e => setRadio(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className='mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition'
                        type='submit'
                    >
                        Obtener Recomendaciones
                    </button>
                </form>

                {recomendaciones.length > 0 && (
                    <div className='mt-6'>
                        <h3 className='text-lg font-semibold'>
                            Recomendaciones:
                        </h3>
                        <ul className='list-disc pl-5'>
                            {recomendaciones.map((recomendacion, index) => (
                                <li key={index}>
                                    Latitud: {recomendacion.latitud}, Longitud:{' '}
                                    {recomendacion.longitud}, Razón:{' '}
                                    {recomendacion.razon}
                                </li>
                            ))}
                        </ul>
                        <MapaHeladeras
                            heladeras={ubicacionesRecomendadas}
                            mapId='recomendaciones'
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecomendacionesHeladeras;
