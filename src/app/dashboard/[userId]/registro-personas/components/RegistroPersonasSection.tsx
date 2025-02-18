'use client';

// import CategoryForm from '@/components/forms/CategoryForm';
import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import FormPersona from './FormPersona';
import { DataTablePersonasVulnerables } from './DataTablePersonasVulnerables';
// implort { DataTableCategory } from './DataTableCategory';

export default function RegistroPersonasSection() {
    const { userId: idUser } = useParams();
    const [isOpenModalRegistroPersona, setIsOpenModalRegistroPersona] =
        useState<boolean>(false);

    return (
        <div>
            <Button
                variant='outline'
                className='my-4'
                onClick={() => setIsOpenModalRegistroPersona(true)}
            >
                Registrar Persona Vulnerable
            </Button>
        
            <Modal
                title='Nuevo empleado'
                description=''
                isOpen={isOpenModalRegistroPersona}
                onClose={() => setIsOpenModalRegistroPersona(false)}
            >
                <FormPersona />
            </Modal>
            <DataTablePersonasVulnerables idUser={idUser.toString()} />
        </div>
    );
};

