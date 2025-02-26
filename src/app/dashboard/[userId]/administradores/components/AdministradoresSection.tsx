'use client';

import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import FormAdministrador from './FormAdministrador';
import { DataTableAdministradores } from './DataTableAdministradores';

export default function AdministradoresSection() {
    const [isOpenModalRegistroAdministrador, setIsOpenModalRegistroAdministrador] =
        useState<boolean>(false);

    return (
        <div>
            <Button
                variant='outline'
                className='my-4'
                onClick={() => setIsOpenModalRegistroAdministrador(true)}
            >
                Registrar administrador
            </Button>
        
            <Modal
                title='Registrar Técnico'
                description=''
                isOpen={isOpenModalRegistroAdministrador}
                onClose={() => setIsOpenModalRegistroAdministrador(false)}
            >
                <FormAdministrador closeModal={() => setIsOpenModalRegistroAdministrador(false)}/>
            </Modal>
            <DataTableAdministradores/>
        </div>
    );
};

