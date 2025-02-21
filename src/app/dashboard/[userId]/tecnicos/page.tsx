
import Head from 'next/head';
import { PageContainer } from '../../components/PageContainer';
import TecnicosSection from './components/TecnicosSection';

export default function RegistroPersonasPage() {
    return (
        <PageContainer>
            <Head>
                <title>Gestión de técnicos</title>
            </Head>
            <main>
                <TecnicosSection />
            </main>
        </PageContainer>
    );
}












// 'use client';
// import { useEffect, useState } from 'react';
// import React from 'react';
// import RegistroTecnico from './components/RegistroTecnico';
// import EdicionTecnico from './components/EdicionTecnico';
// import { PageContainer } from '../../components/PageContainer';
// import { Button } from '@/components/ui/button';
// interface Tecnico {
//     numeroDocumento: string;
//     nombre: string;
//     apellido: string;
//     tipoDocumento: string;
//     cuil: string;
//     medioContacto: string;
//     areaCobertura: string;
//     habilitado: boolean;
// }

// const Tecnicos: React.FC = () => {
//     const [abrirRegistro, setAbrirRegistro] = useState<boolean>(false);
//     const [abrirEdicion, setAbrirEdicion] = useState<Tecnico | null>(null);
//     const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchTecnicos = async () => {
//             const response = await fetch('/api/tecnicos');
//             const data = await response.json();
//             setTecnicos(data);
//         };

//         fetchTecnicos();
//     }, []);

//     const handleUpdate = async (tecnico: Partial<Tecnico>) => {
//         const response = await fetch(`/api/tecnicos`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(tecnico) // Enviando el objeto tecnico completo
//         });

//         const result = await response.json();

//         if (response.ok) {
//             setTecnicos(prev =>
//                 prev.map(existingTecnico =>
//                     existingTecnico.numeroDocumento === tecnico.numeroDocumento
//                         ? { ...existingTecnico, ...tecnico } // Actualizando el técnico con los nuevos datos
//                         : existingTecnico
//                 )
//             );
//             setAbrirEdicion(null); // Cerrar el modal de edición
//         } else {
//             setError(
//                 result.errores || result.mensaje || ['Error al actualizar']
//             );
//         }
//     };

//     const handleAddTechnician = async (nuevoTecnico: Tecnico) => {
//         const response = await fetch(`/api/tecnicos`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(nuevoTecnico) // Enviar el objeto completo
//         });
//         const result = await response.json();
//         if (response.ok) {
//             setTecnicos(prev => [...prev, nuevoTecnico]); // Agregar el nuevo técnico al estado
//             setAbrirRegistro(false); // Cerrar el modal de registro
//             setError(null);
//         } else {
//             setError(result.errores || result.mensaje || ['Error al agregar']);
//         }
//     };

//     const inhabilitarTecnico = async (numeroDocumento: string) => {
//         const tecnico = tecnicos.find(
//             tecnico => tecnico.numeroDocumento === numeroDocumento
//         );
//         if (tecnico) {
//             const updatedInfo = { habilitado: !tecnico.habilitado };
//             const response = await fetch(`/api/tecnicos`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ numeroDocumento, ...updatedInfo })
//             });
//             if (response.ok) {
//                 setTecnicos(prev =>
//                     prev.map(tecnico =>
//                         tecnico.numeroDocumento === numeroDocumento
//                             ? { ...tecnico, habilitado: !tecnico.habilitado }
//                             : tecnico
//                     )
//                 );
//             } else {
//                 const result = await response.json();
//                 setError(
//                     result.errores ||
//                         result.mensaje || [
//                             'Error al cambiar el estado del técnico'
//                         ]
//                 );
//             }
//         }
//     };

//     return (
//         <PageContainer>
//             <section>
//                 <div className='flex justify-around mt-4'>
//                     <button
//                         onClick={() => {
//                             setAbrirRegistro(!abrirRegistro);
//                             setAbrirEdicion(null);
//                         }}
//                         className='bg-blue-600 text-white py-2 px-4 rounded-md shadow-lg transition transform hover:bg-blue-500 hover:scale-105'
//                     >
//                         Registrar nuevo Técnico
//                     </button>
//                 </div>
//             </section>
//             {abrirRegistro && <RegistroTecnico onAdd={handleAddTechnician} />}
//             {abrirEdicion && (
//                 <EdicionTecnico
//                     dataTecnico={abrirEdicion}
//                     onUpdate={handleUpdate}
//                 />
//             )}

//             {error && <div className='text-red-500'>{error}</div>}

//             <section className='technicians-list'>
//                 <h2 className='text-lg font-semibold'>Lista de Técnicos</h2>
//                 <ul className='list-disc pl-5'>
//                     {tecnicos.map(tecnico => (
//                         <li
//                             key={tecnico.numeroDocumento}
//                             className='flex justify-between items-center mb-2'
//                         >
//                             {tecnico.nombre} {tecnico.apellido} - Número de
//                             Documento: {tecnico.numeroDocumento}
//                             <div className='flex space-x-2'>
//                                 <Button
//                                     onClick={() => {
//                                         setAbrirRegistro(false);
//                                         setAbrirEdicion(tecnico);
//                                     }}
//                                     className='w-auto'
//                                 >
//                                     Editar Información
//                                 </Button>
//                                 <Button
//                                     onClick={() =>
//                                         inhabilitarTecnico(
//                                             tecnico.numeroDocumento
//                                         )
//                                     }
//                                     className={
//                                         tecnico.habilitado
//                                             ? 'w-auto bg-red-600 hover:bg-red-500'
//                                             : 'w-auto bg-yellow-500 hover:bg-yellow-400'
//                                     }
//                                 >
//                                     {tecnico.habilitado
//                                         ? 'Inhabilitar técnico'
//                                         : 'Habilitar Técnico'}
//                                 </Button>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </section>
//         </PageContainer>
//     );
// };

// export default Tecnicos;
