'use client';

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnDef
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { AdministradorAction } from './AdministradorAction';
import { useEffect, useState } from 'react';

export type Administrador = {
    id: string;
    nombre: string;
    apellido: string;
};

export const columns: ColumnDef<Administrador>[] = [
    {
        accessorKey: 'id',
        header: 'id'
    },
    {
        accessorKey: 'nombre',
        header: 'Nombre'
    },
    {
        accessorKey: 'apellido',
        header: 'Apellido'
    },
    {
        id: 'actions',
        cell: ({ row }) => <AdministradorAction data={row.original} />
    }
];

export function DataTableAdministradores() {
    const [userId, setUserId] = useState<number|"">('');
    useEffect(() => {
        setUserId(Number(localStorage.getItem("userId")))
    },[]);
    const [arrayAdministradores, setArrayAdministradores] = useState<any[]>([]);
    const [mensaje, setMensaje] = useState<string>('');
    const [error, setError] = useState<boolean>(false);



    async function fetchData() {
        try {
            const response = await fetch("/api/colaborador?tipo_colaborador=admin", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);

            }

            const {colaboradores} = await response.json();
            setArrayAdministradores(colaboradores.map((admin: any) => {
                return {
                    id: admin.tec_id,
                    nombre: admin.persona_humana.ph_nombre,
                    apellido: admin.persona_humana.ph_apellido,
                    dniTipo: admin.persona_humana.ph_dni_tipo,
                    dniNro: admin.persona_humana.ph_dni_nro,
                    email: admin.persona_humana.ph_mail,
                    telefono: admin.persona_humana.ph_telefono,
                }
            }));

            setError(false);
            setMensaje('');
        } catch (error) {
            console.error("Error obteniendo los datos:", error);
            setMensaje('Error al obtener personas en situacion vulnerable');
            setError(true);
        }
    }

    useEffect(() => {
        fetchData();
    },[]);

    const table = useReactTable({
        data: arrayAdministradores,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <div className='rounded-md border'>

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map(row => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className='h-24 text-center'
                            >
                                Cargando...
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
