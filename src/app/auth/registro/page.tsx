'use client';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

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
        password2: z.string(),
        ayudarPersonas: z.boolean().default(false).optional()
    })
    .refine(data => data.password === data.password2, {
        message: 'Las contraseñas no coinciden',
        path: ['password2']
    });

export default function RegistroPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            usuario: '',
            password: '',
            password2: '',
            ayudarPersonas: false
        }
    });

    async function onSubmit(dataForm: z.infer<typeof formSchema>) {
        const userId = 1;
        localStorage.setItem('userId', `${userId}`);
        router.push(`/dashboard`);
    }

    return (
        <div className='mx-auto grid w-[400px] gap-6'>
            <div className='grid gap-2 text-left'>
                <h1 className='text-2xl font-bold'>SMAA - Registro</h1>
                <p className='text-balance text-muted-foreground'>
                    Sistema de Mejora para el Acceso Alimentario
                </p>
            </div>
            <div className='grid gap-y-8'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
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
                            <div className='grid gap-2'>
                                <FormField
                                    control={form.control}
                                    name='ayudarPersonas'
                                    render={({ field }) => (
                                        <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <div className='space-y-1 leading-none'>
                                                <FormLabel>
                                                    Registrar personas en sit.
                                                    vulnerable
                                                </FormLabel>
                                                <FormDescription>
                                                    Marque esta opción si deseas
                                                    colabrar en el registro de
                                                    personas vulnerables
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type='submit'
                                className='w-full'
                                disabled={false}
                            >
                                Crear cuenta
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className='text-center text-sm py-4'>
                    ¿Ya tienes una cuenta?{' '}
                    <Link href='/auth' className='underline'>
                        Inicia sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}