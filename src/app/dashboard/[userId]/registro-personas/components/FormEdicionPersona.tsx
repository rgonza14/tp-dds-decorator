'use client';
import { useEffect, useState } from 'react';

export default function FormEdicionPersona({ data }: { data: any }) {

    const [userId, setUserId] = useState<number|"">("");
    useEffect(() => {
        setUserId(Number(localStorage.getItem("userId")))
    },[]);

    const [nombre, setNombre] = useState<string>(data.nombre);
    const [apellido, setApellido] = useState<string>(data.apellido);
    const [fechaNacimiento, setFechaNacimiento] = useState<string>(data.fechaNacimiento.split("T")[0]);
    const [fechaRegistro, setFechaRegistro] = useState<string>(data.fechaRegistro.split("T")[0]);
    const [direccion, setDireccion] = useState<string>(data.direccion);
    const [dniTipo, setDniTipo] = useState<string>(data.dniTipo);
    const [dniNro, setDniNro] = useState<string>(data.dniNro);
    const [cantMenoresACargo, setCantMenoresACargo] = useState<number | "">(data.cantMenoresACargo);
    const [tarjetaNro, setTarjetaNro] = useState<string>("");
    const [editarTarjeta, setEditarTarjeta] = useState<boolean>(false);

    const [mensaje, setMensaje] = useState<string>('');
    const [error, setError] = useState<boolean>(false);


    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        alert("Edición en desarrollo");
        // try {
        //     const response = await fetch("/api/persona_situacion_vulnerable", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             cola_id: userId,
        //             personaData: {
        //                 psv_nombre: nombre,
        //                 psv_apellido: apellido,
        //                 psv_fecha_nacimiento: new Date(fechaNacimiento).toISOString(),
        //                 psv_fecha_registro: new Date(fechaRegistro).toISOString(),
        //                 psv_direccion: direccion,
        //                 psv_dni_tipo: dniTipo,
        //                 psv_dni_nro: dniNro,
        //                 psv_menores_a_cargo: Number(cantMenoresACargo)

        //             }
        //         })
        //     });

            
        //     const result = await response.json();
            
        //     if(registrarTarjeta) {
        //         const responseT = await fetch("/api/tarjeta_beneficiario", {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json"
        //             },
        //             body: JSON.stringify({
        //                 tarjeta_nro: tarjetaNro,
        //                 fecha: (new Date()).toISOString(),
        //                 cola_id: userId,
        //                 psv_id: result.persona.psv_id
        //             })
        //         });
        //         if(!responseT.ok) {
        //             alert("Error al cargar la tarjeta");
        //         }
        //     }

        //     if(response.ok) {
        //         setMensaje(result.mensaje);
        //         setError(false);
        //         closeModal();

        //     } else {
        //         setMensaje(result.mensaje || 'Error al registrar la heladera');
        //         setError(true);

        //     }

        // } catch (error) {
        //     console.error('Error al registrar la heladera:', error);
        //     setMensaje('Error al registrar la heladera');
        // }
    };

    return (
        <div className='flex justify-center mt-6'>
            <div className='w-3/4 bg-white shadow-lg rounded-lg p-6'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <h2 className='text-lg font-semibold'>
                        Registro Persona
                    </h2>
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
                            htmlFor='fechaNacimiento'
                            className='block text-sm font-medium'
                        >
                            Fecha de nacimiento:
                        </label>
                        <input
                            type='date'
                            id='fechaNacimiento'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={fechaNacimiento}
                            onChange={e =>
                                setFechaNacimiento(e.target.value)
                            }
                            required
                        />
                    </div>
                    
                    <div>
                        <label
                            htmlFor='fechaRegistro'
                            className='block text-sm font-medium'
                        >
                            Fecha de registro:
                        </label>
                        <input
                            type='date'
                            id='fechaRegistro'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={fechaRegistro}
                            onChange={e =>
                                setFechaRegistro(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='direccion'
                            className='block text-sm font-medium'
                        >
                            Direccion (opcional):
                        </label>
                        <input
                            type='text'
                            id='direccion'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={direccion}
                            onChange={e => setDireccion(e.target.value)}
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
                            htmlFor='cantMenoresACargo'
                            className='block text-sm font-medium'
                        >
                            Menores a cargo:
                        </label>
                        <input
                            type='number'
                            id='cantMenoresACargo'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={cantMenoresACargo}
                            onChange={e => setCantMenoresACargo(Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className='flex gap-2'>
                        <input
                            type='checkbox'
                            id='registrarTarjeta'
                            className='mt-1 p-2 border rounded-md '
                            checked={editarTarjeta}
                            onChange={e => setEditarTarjeta(Boolean(e.target.checked))}
                        />
                        <label
                            htmlFor='mostrarTodos'
                            className='block text-sm font-medium'
                        >
                            Editar Tarjeta:
                        </label>
                    </div>

                    {editarTarjeta && <div>
                        <label
                            htmlFor='tarjetaNro'
                            className='block text-sm font-medium'
                        >
                            Nro Tarjeta:
                        </label>
                        <input
                            type='text'
                            id='tarjetaNro'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={tarjetaNro}
                            onChange={e => setTarjetaNro(e.target.value)}
                            required
                        />
                    </div>}

                    <button
                        className='mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition'
                        type='submit'
                    >
                        Registrar Persona
                    </button>
                </form>
            </div>
        </div>
    );
};
