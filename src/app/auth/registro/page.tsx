'use client';
import { useState } from 'react';
import { useDataForm } from '../../context/DataFormContext';
import { useRouter } from 'next/navigation';
import RegistroForm from './components/RegistroForm';
import RegistroPersonaHumana from './components/RegistroPersonaHumana';
import RegistroPersonaJuridica from './components/RegistroPersonaJuridica';
import LoginPage from './components/LoginForm';
import { z } from 'zod';

export default function RegistroComponent() {
    const [showFormUsuario, setShowFormUsuario] = useState(false);
    const [showLogin, setShowLogin] = useState(false); // Estado para mostrar el inicio de sesión
    const router = useRouter();
    const { dataForm, setDataForm } = useDataForm();
    
    async function submitRegistroUsuario(dataForm: any) {
        console.log('dataForm: ', dataForm);
        setDataForm(dataForm);
        setShowFormUsuario(true);
    }

    return (
        <div className='mt-10'>
            {!showFormUsuario ? (
                showLogin ? (
                    <LoginPage setShowLogin={setShowLogin} />
                ) : (
                    <RegistroForm
                    onSubmit={submitRegistroUsuario}
                    setShowLogin={setShowLogin}
                    />
                )
            ) : dataForm.personaJuridica ? (
                <RegistroPersonaJuridica />
            ) : (
                <RegistroPersonaHumana />
            )}
        </div>
    );
}





export const formSchema = z
    .object({
        usuario: z.string(),
        password: z
            .string()
            .min(8, {
                message: 'La contraseña debe tener al menos 8 caracteres'
            })
            .max(64, {
                message: 'La contraseña debe tener menos de 64 caracteres'
            }),
        password2: z.string(),
        personaJuridica: z.boolean().default(false).optional(),
        ayudarPersonas: z.boolean().default(false).optional()
    })
    .refine(data => data.password === data.password2, {
        message: 'Las contraseñas no coinciden',
        path: ['password2']
    });