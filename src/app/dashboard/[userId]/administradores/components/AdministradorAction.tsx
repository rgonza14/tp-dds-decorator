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
// import { toast } from 'sonner';
// import useSWRMutation from 'swr/mutation';

// const fetcher = (url: string) => client.get(url);

export function AdministradorAction({ data }: { data: any }) {
    const [loading, setLoading] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDetalle, setIsOpenDetalle] = useState(false);
    const router = useRouter();
    const { idUser } = useParams();

    async function onConfirmDelete() {
        try {
            setLoading(true);

            const response = await fetch("/api/colaborador", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({cola_id: data.id})
            });

            
            const {colaborador} = await response.json();

            if(!response.ok) {
                alert("Error: no se pudo eliminar el colaborador");
            } else {
                console.log(colaborador);
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

            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                        <span className='sr-only'>Abrir menú</span>
                        <MoreHorizontal className='h-4 w-4' />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>

                    <DropdownMenuItem onClick={() => setIsOpenDelete(true)}>
                        <Trash className='mr-2 h-4 w-4' />
                        Eliminar
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
