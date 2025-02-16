'use client';
import { useDataForm } from '@/app/context/DataFormContext';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


interface PersonaHumanaJSON {
    cola_usuario: string;
    cola_contrasena: string;
    cola_tipo_colaborador: string;
    ph_nombre: string;
    ph_apellido: string;
    ph_telefono: string;
    ph_mail: string;
    ph_fecha_nacimiento: string;
    ph_direccion: string
}

export default function RegistroPersonaHumana() {
    const router = useRouter();
    const [nombre, setNombre] = useState<string>('');
    const [apellido, setApellido] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telefono, setTelefono] = useState<string>('');
    const [direccion, setDireccion] = useState<string>('');
    const [fechaNacimiento, setFechaNacimiento] = useState<string>('');
    const [codigoPostal, setCodigoPostal] = useState<string>('');
    const { dataForm } = useDataForm();

    console.log('dataForm: ', dataForm);
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        // NUEVA ESTRUCTURA
        const nuevoColaborador: PersonaHumanaJSON = {
            cola_usuario: dataForm.usuario,
            cola_contrasena: dataForm.password,
            cola_tipo_colaborador: "persona_humana",
            ph_nombre: nombre,
            ph_apellido: apellido,
            ph_telefono: telefono,
            ph_mail: email,
            ph_fecha_nacimiento: fechaNacimiento,
            ph_direccion: direccion
        }
        
        
        try {
            const response = await fetch("/api/auth/registrarPH", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(nuevoColaborador)
            });

            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const {colaborador, persona} = await response.json();
            console.log("colaborador agregado", {colaborador, persona});
            localStorage.setItem('userId', colaborador.cola_id);
            localStorage.setItem("tipo_colaborador", colaborador.cola_tipo_colaborador);
            localStorage.setItem("persona", JSON.stringify(persona));
            router.push('/');


        } catch(error) {
            console.error("Error: ", error);
        }
    };

    return (
        <div className='flex justify-center mt-6'>
            <div className='w-3/4 bg-white shadow-lg rounded-lg p-6'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <h2 className='text-lg font-semibold'>
                        Registro de Persona Humana
                    </h2>

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
                            Correo Electrónico:
                        </label>
                        <input
                            type='email'
                            id='email'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='telefono'
                            className='block text-sm font-medium'
                        >
                            Teléfono/WhatsApp:
                        </label>
                        <input
                            type='tel'
                            id='telefono'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
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
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='codigo-postal'
                            className='block text-sm font-medium'
                        >
                            Código Postal:
                        </label>
                        <input
                            type='text'
                            id='codigo-postal'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={codigoPostal}
                            onChange={e => setCodigoPostal(e.target.value)}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='fechaNacimiento'
                            className='block text-sm font-medium'
                        >
                            Fecha de Nacimiento (opcional):
                        </label>
                        <input
                            type='date'
                            id='fechaNacimiento'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={fechaNacimiento}
                            onChange={e => setFechaNacimiento(e.target.value)}
                        />
                    </div>

                    <button
                        className='mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition'
                        type='submit'
                    >
                        Registrar Persona Humana
                    </button>
                </form>
            </div>
        </div>
    );
};