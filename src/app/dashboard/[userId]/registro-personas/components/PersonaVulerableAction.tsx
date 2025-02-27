'use client';

import AlertModal from '@/components/modal/AlertModal';
import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
// import client from '@/lib/api/client';
// import { Service } from '@/lib/types/service.types';
import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import DetalleTarjeta from './DetalleTarjeta';
import FormEdicionPersona from './FormEdicionPersona';
// import { toast } from 'sonner';
// import useSWRMutation from 'swr/mutation';

// const fetcher = (url: string) => client.get(url);

export function PersonaVulnerableAction({ data }: { data: any }) {
    const [loading, setLoading] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDetalle, setIsOpenDetalle] = useState(false);
    const router = useRouter();
    const { idUser } = useParams();

    async function onConfirmDelete() {
        try {
            setLoading(true);

            const response = await fetch("/api/persona_situacion_vulnerable", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({psv_id: data.id})
            });

            
            const {persona} = await response.json();

            if(!response.ok) {
                alert("Error: no se pudo eliminar la persona");
            } else {
                console.log(persona);
            }

            setIsOpenDelete(false);
            location.reload();

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <AlertModal
                title='¿Estás seguro que quieres continuar?'
                description='Esta acción no puede revertirse.'
                isOpen={isOpenDelete}
                onClose={() => setIsOpenDelete(false)}
                onConfirm={onConfirmDelete}
                loading={loading}
            />

            <Modal
                title='Editar información'
                description=''
                isOpen={isOpenEdit}
                onClose={() => setIsOpenEdit(false)}
            >
                <FormEdicionPersona data={data}/>
            </Modal>

            <Modal
                title='Detalle de tarjeta asociada'
                description=''
                isOpen={isOpenDetalle}
                onClose={() => setIsOpenDetalle(false)}
            >
                <DetalleTarjeta data={data}/>
            </Modal>

            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                        <span className='sr-only'>Abrir menú</span>
                        <MoreHorizontal className='h-4 w-4' />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>

                    <DropdownMenuItem onClick={() => setIsOpenEdit(true)}>
                        <Edit className='mr-2 h-4 w-4' />
                        Editar
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setIsOpenDetalle(true)}>
                        <Eye className='mr-2 h-4 w-4' />
                        Ver detalle tarjeta
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setIsOpenDelete(true)}>
                        <Trash className='mr-2 h-4 w-4' />
                        Eliminar
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
