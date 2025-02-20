'use client';

import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import FormRegistroPersona from './FormRegistroPersona';
import { DataTablePersonasVulnerables } from './DataTablePersonasVulnerables';

export default function PersonasSection() {
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
                title='Registrar Persona Vulnerable'
                description=''
                isOpen={isOpenModalRegistroPersona}
                onClose={() => setIsOpenModalRegistroPersona(false)}
            >
                <FormRegistroPersona closeModal={() => setIsOpenModalRegistroPersona(false)}/>
            </Modal>
            <DataTablePersonasVulnerables/>
        </div>
    );
};

