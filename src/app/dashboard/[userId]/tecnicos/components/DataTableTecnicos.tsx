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
import { TecnicoAction } from './TecnicoAction';
import { useEffect, useState } from 'react';

export type Tecnico = {
    id: string;
    nombre: string;
    apellido: string;
    baja: boolean;
};

export const columns: ColumnDef<Tecnico>[] = [
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
        accessorKey: 'baja',
        header: 'Estado'
    },
    {
        id: 'actions',
        cell: ({ row }) => <TecnicoAction data={row.original} />
    }
];

export function DataTableTecnicos() {
    const [userId, setUserId] = useState<number|"">('');
    useEffect(() => {
        setUserId(Number(localStorage.getItem("userId")))
    },[]);
    const [arrayTecnicos, setArrayTecnicos] = useState<any[]>([]);
    const [mensaje, setMensaje] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);



    async function fetchData() {
        setIsLoading(true);
        try {
            const response = await fetch("/api/tecnico", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);

            }

            const {tecnicos} = await response.json();
            setArrayTecnicos(tecnicos.map((tecnico: any) => {
                return {
                    id: tecnico.tec_id,
                    nombre: tecnico.tec_nombre,
                    apellido: tecnico.tec_apellido,
                    baja: tecnico.tec_baja?"BAJA":"activo",
                    dniTipo: tecnico.tec_dni_tipo,
                    dniNro: tecnico.tec_dni_nro,
                    cuil: tecnico.tec_cuil,
                    email: tecnico.tec_mail,
                    telefono: tecnico.tec_telefono,
                    areaCobertura: tecnico.tec_area_cobertura,
                }
            }));

            setError(false);
            setMensaje('');
        } catch (error) {
            console.error("Error obteniendo los datos:", error);
            setMensaje('Error al obtener personas en situacion vulnerable');
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    },[]);

    const table = useReactTable({
        data: arrayTecnicos,
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
                    {!isLoading ? (
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
