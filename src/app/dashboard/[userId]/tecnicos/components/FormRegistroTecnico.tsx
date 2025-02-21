'use client';
import { useEffect, useState } from 'react';

export default function FormRegistroTecnico({closeModal}: {closeModal: ()=>void}) {

    const [userId, setUserId] = useState<number|"">("");
    useEffect(() => {
        setUserId(Number(localStorage.getItem("userId")))
    },[]);

    const [nombre, setNombre] = useState<string>("");
    const [apellido, setApellido] = useState<string>("");
    const [dniTipo, setDniTipo] = useState<string>("");
    const [dniNro, setDniNro] = useState<string>("");
    const [cuil, setCuil] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telefono, setTelefono] = useState<string>("");
    const [areaCobertura, setAreaCobertura] = useState<string>("");

    const [mensaje, setMensaje] = useState<string>('');
    const [error, setError] = useState<boolean>(false);


    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        try {
            const response = await fetch("/api/tecnico", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tecnicoData: {
                        tec_nombre: nombre,
                        tec_apellido: apellido,
                        tec_dni_tipo: dniTipo,
                        tec_dni_nro: dniNro,
                        tec_cuil: cuil,
                        tec_mail: email,
                        tec_telefono: telefono,
                        tec_area_cobertura: areaCobertura

                    }
                })
            });

            
            const result = await response.json();

            if(response.ok) {
                setMensaje(result.mensaje);
                setError(false);
                closeModal();

            } else {
                setMensaje(result.mensaje || 'Error al registrar al técnico');
                setError(true);

            }

        } catch (error) {
            console.error('Error al registrar al técnico:', error);
            setMensaje('Error al registrar al técnico');
        }
    };

    return (
        <div className='flex justify-center mt-6'>
            <div className='w-3/4 bg-white shadow-lg rounded-lg p-6'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    {mensaje && (
                        <div
                            className={`text-lg font-semibold text-center mb-2 ${
                                error ? 'text-red-600' : 'text-green-600'
                            }`}
                        >
                            {mensaje}
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor='nombre'
                            className='block text-sm font-medium'
                        >
                            Nombre:
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
                            htmlFor='apellido'
                            className='block text-sm font-medium'
                        >
                            Apellido:
                        </label>
                        <input
                            type='text'
                            id='apellido'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={apellido}
                            onChange={e => setApellido(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium'
                        >
                            Mail:
                        </label>
                        <input
                            type='text'
                            id='email'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='telefono'
                            className='block text-sm font-medium'
                        >
                            Teléfono:
                        </label>
                        <input
                            type='text'
                            id='telefono'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='dniTipo'
                            className='block text-sm font-medium'
                        >
                            DNI Tipo:
                        </label>
                        <select
                            id='id'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={dniTipo}
                            onChange={e => setDniTipo(e.target.value)}
                            required
                        >
                            <option value="">Seleccionar id</option>
                            <option value="DNI">DNI: Documento nacional de identidad</option>
                            <option value="LC">LC: Libreta cívica</option>
                            <option value="LE">LE: Libreta de enrolamiento</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor='dniNro'
                            className='block text-sm font-medium'
                        >
                            DNI Nro:
                        </label>
                        <input
                            type='text'
                            id='dniNro'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={dniNro}
                            onChange={e => setDniNro(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='cuil'
                            className='block text-sm font-medium'
                        >
                            CUIL:
                        </label>
                        <input
                            type='text'
                            id='cuil'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={cuil}
                            onChange={e => setCuil(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='areaCobertura'
                            className='block text-sm font-medium'
                        >
                            Área de cobertura:
                        </label>
                        <input
                            type='text'
                            id='areaCobertura'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={areaCobertura}
                            onChange={e => setAreaCobertura(e.target.value)}
                        />
                    </div>

                    <button
                        className='mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition'
                        type='submit'
                    >
                        Registrar Técnico
                    </button>
                </form>
            </div>
        </div>
    );
};
