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
import { PersonaVulnerableAction } from './PersonaVulerableAction';
import { useEffect, useState } from 'react';

export type PersonaVulnerable = {
    id: string;
    nombre: string;
    tarjeta: string;
    cantMenoresACargo: number;
};

const personasVulnerables: PersonaVulnerable[] = [
    {
        id: '1',
        nombre: 'adsd',
        tarjeta: '123123',
        cantMenoresACargo: 0
    },
    {
        id: '2',
        nombre: 'dasdasda',
        tarjeta: '0o3102o30',
        cantMenoresACargo: 1
    }
];
export const columns: ColumnDef<PersonaVulnerable>[] = [
    {
        accessorKey: 'id',
        header: 'id'
    },
    {
        accessorKey: 'nombre',
        header: 'Nombre'
    },
    {
        accessorKey: 'tarjeta',
        header: 'Tarjeta asociada'
    },
    {
        id: 'actions',
        cell: ({ row }) => <PersonaVulnerableAction data={row.original} />
    }
];

export function DataTablePersonasVulnerables() {
    const [userId, setUserId] = useState<number|"">('');
    useEffect(() => {
        setUserId(Number(localStorage.getItem("userId")))
    },[]);
    const [arrayPersonas, setArrayPersonas] = useState<any[]>([]);
    const [mostrarTodos, setMostrarTodos] = useState<boolean>(false);
    const [mensaje, setMensaje] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    

    async function fetchData() {
        try {
            const response = await fetch(`/api/persona_situacion_vulnerable${mostrarTodos?``:`?cola_id=${userId}`}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);

            }

            const {personas} = await response.json();
            setArrayPersonas(personas);
            // BORRAR LOG AL TERMINAR
            console.log("-> personas:",personas);

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
    },[mostrarTodos]);

    const table = useReactTable({
        data: personasVulnerables,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <div className='rounded-md border'>
        <div>
            <label
                htmlFor='mostrarTodos'
                className='block text-sm font-medium'
            >
                Fecha de Funcionamiento:
            </label>
            <input
                type='checkbox'
                id='mostrarTodos'
                className='mt-1 p-2 border rounded-md w-full'
                checked={mostrarTodos}
                onChange={e => setMostrarTodos(Boolean(e.target.checked))}
            />
        </div>

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
                                Sin resultados
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
