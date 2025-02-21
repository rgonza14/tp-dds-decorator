"use client";

import React, {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";

export default function EditarPerfilPJ() {
    const [userId, setUserId] = useState<number|"">('');
    useEffect(() => {
        setUserId(Number(localStorage.getItem("userId")))
    },[]);

    const persona = JSON.parse(String(localStorage.getItem("persona")));

    const [razonSocial, setRazonSocial] = useState<string>(persona.pj_razon_social);
    const [tipo, setTipo] = useState<string>(persona.pj_tipo);
    const [rubro, setRubro] = useState<string>(persona.pj_rubro);
    const [email, setEmail] = useState<string>(persona.pj_mail);
    const [telefono, setTelefono] = useState<string>(persona.pj_telefono);
    const [direccion, setDireccion] = useState<string>(persona.pj_direccion);

    const [resultado, setResultado] = useState<any>(null);
    const [error, setError] = useState<boolean>(false);

    async function handleSubmit(e: React.FormEvent) {
        setResultado(null);
        setError(false);
        e.preventDefault();

        try {
            const response = await fetch("/api/colaborador", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cola_id: userId,
                    colaboradorData: null,
                    personaData: {
                        pj_razon_social: razonSocial,
                        pj_tipo: tipo,
                        pj_rubro: rubro,
                        pj_direccion: direccion,
                        pj_telefono: telefono,
                        pj_mail: email
                    }
                })
            });

            if(response.ok) {
                const result = await response.json();
                const personaActualizada = result.persona;
                localStorage.setItem("persona", JSON.stringify(personaActualizada));
                setResultado(result.message);
            } else {
                setResultado("Error, por favor intentá de nuevo");
                setError(true);
            }
        } catch(error: any) {
            setResultado('Error, por favor intentá de nuevo');
            setError(true);
        }
    }

    return (
            <div className='p-4'>
                {resultado && (
                    <div
                        className={`text-lg font-semibold text-center mb-2 ${
                            error ? 'text-red-600' : 'text-blue-600'
                        }`}
                    >
                        {resultado}
                    </div>
                )}
                <h1 className='text-2xl font-bold mb-4'>
                    Editar Perfil de Usuario
                </h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <h2 className='text-lg font-semibold'>
                        Información del Usuario
                    </h2>
    
                    <div>
                        <label
                            htmlFor='razon_social'
                            className='block text-sm font-medium'
                        >
                            Razón social:
                        </label>
                        <input
                            type='text'
                            id='razon_social'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={razonSocial}
                            onChange={e => setRazonSocial(e.target.value)}
                        />
                    </div>
    
                    <div>
                        <label
                            htmlFor='tipo'
                            className='block text-sm font-medium'
                        >
                            Tipo:
                        </label>
                        <input
                            type='text'
                            id='tipo'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={tipo}
                            onChange={e => setTipo(e.target.value)}
                        />
                    </div>
    
                    <div>
                        <label
                            htmlFor='rubro'
                            className='block text-sm font-medium'
                        >
                            Rubro:
                        </label>
                        <input
                            type='text'
                            id='rubro'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={rubro}
                            onChange={e => setRubro(e.target.value)}
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
                            type='tel'
                            id='telefono'
                            className='mt-1 p-2 border rounded-md w-full'
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
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
    
                    <Button
                        className='mt-4 bg-primary text-white py-2 rounded-md hover:bg-primary-dark'
                        type='submit'
                        disabled={
                            !razonSocial &&
                            !tipo &&
                            !rubro &&
                            !email &&
                            !direccion
                        }
                    >
                        Guardar Cambios
                    </Button>
                </form>
            </div>
    )
}