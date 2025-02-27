// components/RegistroForm.jsx
'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

const formSchema = z
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
        password2: z.string()
    })
    .refine(data => data.password === data.password2, {
        message: 'Las contraseñas no coinciden',
        path: ['password2']
    });

export default function RegistroForm({closeModal}: {closeModal: ()=>void}) {

    const [mensaje, setMensaje] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            usuario: '',
            password: '',
            password2: ''
        }
    });

    form.getValues().usuario

    async function handleSubmit() {
        try {
            const response = await fetch("/api/auth/registrarPH", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                        cola_usuario: form.getValues().usuario,
                        cola_contrasena: form.getValues().password,
                        cola_tipo_colaborador: "admin",
                })
            })

            
            location.reload();

        } catch (error) {
            console.error('Error al registrar el administrador:', error);
            setMensaje('Error al registrar el administrador');
        }

    }

    return (
        <div className='mx-auto grid w-[400px] gap-6'>
            <div className='grid gap-2 text-left'>
                <h1 className='text-2xl font-bold'>Registro de administradores</h1>
            </div>
            <div className='grid gap-y-3'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className='grid gap-y-6'>
                            <div className='grid gap-2'>
                                <FormField
                                    control={form.control}
                                    name='usuario'
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>Usuario</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Usuario'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {fieldState.error?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='grid gap-2'>
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>Contraseña</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Contraseña'
                                                    type='password'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {fieldState.error?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='grid gap-2'>
                                <FormField
                                    control={form.control}
                                    name='password2'
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Confirmar contraseña
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Repetir contraseña'
                                                    {...field}
                                                    type='password'
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {fieldState.error?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type='submit' className='w-full'>
                                Crear cuenta
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
