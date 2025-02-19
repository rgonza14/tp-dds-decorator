'use client';

import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function DetalleTarjeta({ data }: { data: any }) {
    console.log("-->data: ",data)
    const [fields] = useState([
        { label: 'Beneficiario', value: `${data.nombre} ${data.apellido}`},
        { label: 'Número de tarjeta', value: '1234567890xa' },
        { label: 'Usos en el día', value: '1' },
        { label: 'Usos restantes', value: '3' },

        { label: 'Colaborador a cargo del tramite', value: 'Franco Martinez' }
    ]);

    return (
        <div className='grid gap-4 py-4'>
            {fields.map((field, index) => (
                <div
                    key={index}
                    className='grid grid-cols-4 items-center gap-4'
                >
                    <Label htmlFor={field.label} className='text-right'>
                        {field.label}:
                    </Label>
                    <div className='col-span-3'>
                        <div
                            id={field.label}
                            className='h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors'
                        >
                            {field.value}
                        </div>
                        <div className='h-[1px] w-full bg-input mt-[-1px]'></div>
                    </div>
                </div>
            ))}
        </div>
    );
};