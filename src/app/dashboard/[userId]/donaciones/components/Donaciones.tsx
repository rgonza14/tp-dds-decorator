import React, { useState, useEffect } from 'react';

const DonacionesForm: React.FC = () => {
    const userId = localStorage.getItem('userId');
    const [fecha, setFecha] = useState<string>('');
    const [monto, setMonto] = useState<number | ''>('');
    const [frecuencia, setFrecuencia] = useState<string>('');

    const [mensaje, setMensaje] = useState<string>('');

    async function handleSubmit(e: React.FormEvent) {

        try {
            const response = await fetch('/api/donacion_dinero', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cola_id: userId,
                    donacionDineroData: {
                        dd_monto: Number(monto),
                        dd_frecuencia: frecuencia,
                        dd_fecha: new Date(fecha).toISOString()
                    }
                })
            });

            if (response.ok) {
                setFecha('');
                setMonto('');
                setFrecuencia('');
                setMensaje("Gracias! La donación se ha guardado exitosamente");
            } else {
                const errorData = await response.json();
                console.error('Errores:', errorData.errores);
            }
        } catch (error) {
            console.error('Error en la conexión:', error);
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <h2 className='text-lg font-semibold'>
                    Formulario de Donaciones
                </h2>
                    {mensaje && (
                        <div className='text-green-600'>{mensaje}</div>
                    )}{' '}

                <div>
                    <label
                        htmlFor='fecha'
                        className='block text-sm font-medium'
                    >
                        Fecha de la donación:
                    </label>
                    <input
                        type='date'
                        id='fecha'
                        className='mt-1 p-2 border rounded-md w-full'
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='monto'
                        className='block text-sm font-medium'
                    >
                        Monto de la donación:
                    </label>
                    <input
                        type='number'
                        id='monto'
                        className='mt-1 p-2 border rounded-md w-full'
                        value={monto}
                        onChange={e => setMonto(Number(e.target.value))}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='frecuencia'
                        className='block text-sm font-medium'
                    >
                        Frecuencia:
                    </label>
                    <select
                        id='frecuencia'
                        className='mt-1 p-2 border rounded-md w-full'
                        value={frecuencia}
                        onChange={e => setFrecuencia(e.target.value)}
                    >
                        <option value="">Seleccionar id</option>
                        <option value='una vez'>Una vez</option>
                        <option value='semanal'>Semanal</option>
                        <option value='mensual'>Mensual</option>
                        <option value='anual'>Anual</option>
                    </select>
                </div>

                <button
                    type='submit'
                    className='mt-4 bg-primary text-white py-2 rounded-md hover:bg-primary-dark'
                >
                    Enviar Donación
                </button>
            </form>

        </div>
    );
};

export default DonacionesForm;
