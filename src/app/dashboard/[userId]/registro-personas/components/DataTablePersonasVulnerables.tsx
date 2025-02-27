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
    apellido: string;
    cantMenoresACargo: number;
    baja: boolean;
};

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
        accessorKey: 'apellido',
        header: 'Apellido'
    },
    {
        accessorKey: 'baja',
        header: 'Estado'
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
    const [isLoading, setIsLoading] = useState<boolean>(false);



    async function fetchData() {
        setIsLoading(true);
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
            setArrayPersonas(personas.map((persona: any) => {
                return {
                    id: persona.psv_id,
                    nombre: persona.psv_nombre,
                    apellido: persona.psv_apellido,
                    baja: persona.psv_baja?"BAJA":"activo",
                    fechaNacimiento: persona.psv_fecha_nacimiento,
                    fechaRegistro: persona.psv_fecha_registro,
                    direccion: persona.psv_direccion,
                    dniTipo: persona.psv_dni_tipo,
                    dniNro: persona.psv_dni_nro,
                    cantMenoresACargo: persona.psv_menores_a_cargo,
                    colaborador: persona.psv_colaborador
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
    },[mostrarTodos]);

    const table = useReactTable({
        data: arrayPersonas,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <div className='rounded-md border'>
        <div className='flex gap-2'>
            <input
                type='checkbox'
                id='mostrarTodos'
                className='mt-1 p-2 border rounded-md '
                checked={mostrarTodos}
                onChange={e => setMostrarTodos(Boolean(e.target.checked))}
            />
            <label
                htmlFor='mostrarTodos'
                className='block text-sm font-medium'
            >
                Mostrar todos:
            </label>
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
