'use client';
import { DataFormProvider } from '../context/DataFormContext';
import RegistroPage from './registro/page';

import { useState } from 'react';
// comente import y uso de useRouter, porque daba error y router no se estaba usando
// import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// Fede: importo formSchema
import { formSchema } from './registro/page';

// Fede: cambie el nombre a Auth RegistroPage porque entraba en conflicto con el import de arriba.
export default function AuthRegistroPage() {
    const [isLoading, setIsLoading] = useState(false);
    // const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            usuario: '',
            password: '',
            password2: '',
            personaJuridica: false,
            ayudarPersonas: false
        }
    });

    async function onSubmit(dataForm: z.infer<typeof formSchema>) {}

    return (
        <DataFormProvider>
            <RegistroPage />
        </DataFormProvider>
    );
}
