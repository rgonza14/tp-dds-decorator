'use client';

import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import FormRegistroTecnico from './FormRegistroTecnico';
import { DataTableTecnicos } from './DataTableTecnicos';

export default function TecnicosSection() {
    const [isOpenModalRegistroPersona, setIsOpenModalRegistroPersona] =
        useState<boolean>(false);

    return (
        <div>
            <Button
                variant='outline'
                className='my-4'
                onClick={() => setIsOpenModalRegistroPersona(true)}
            >
                Registrar técnico
            </Button>
        
            <Modal
                title='Registrar Técnico'
                description=''
                isOpen={isOpenModalRegistroPersona}
                onClose={() => setIsOpenModalRegistroPersona(false)}
            >
                <FormRegistroTecnico closeModal={() => setIsOpenModalRegistroPersona(false)}/>
            </Modal>
            <DataTableTecnicos/>
        </div>
    );
};

