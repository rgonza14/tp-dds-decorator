import { useState } from "react";
import Papa from "papaparse";

interface RowData {
    "Tipo Doc": string;
    Documento: number;
    Nombre: string;
    Apellido: string;
    Mail: string;
    "Fecha de colaboración": string;
    "Forma de colaboración": string;
    Cantidad: number;
}
export default function CargarColaboracionesForm() {
    const [data, setData] = useState<RowData[]>([]);

    const [resultado, setResultado] = useState<any>(null);
    const [error, setError] = useState<boolean>(false);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        Papa.parse<RowData>(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                setData(result.data);
            },
        });
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await fetch("/api/carga_masiva_colaboraciones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    colaboracionesData: data
                })
            });

            const {colaboraciones} = await response.json();

            if(!response.ok) {
                setResultado('Error, por favor intentá de nuevo');
                setError(true);
                console.log("error, colaboraciones POST => ", colaboraciones);
            } else {
                setResultado('Colaboraciones cargadas exitosamente');
                setError(false);
                console.log("colaboraciones cargadas POST => ", colaboraciones);

            }
        } catch(error: any) {
            setResultado('Error, por favor intentá de nuevo');
            setError(true);
            console.error(error);
        }
    }

    return (
        <div className="p-4">
            <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-4" />
            {data.length > 0 && (
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    {resultado && (
                        <div
                            className={`text-lg font-semibold text-center mb-2 ${
                                error ? 'text-red-600' : 'text-blue-600'
                            }`}
                        >
                            {resultado}
                        </div>
                    )}
                    <button
                        type='submit'
                        className='mt-4 bg-primary text-white py-2 rounded-md hover:bg-primary-dark'
                    >
                        Confirmar
                    </button>
                    <table className="border-collapse border border-gray-300 w-full">
                        <thead>
                            <tr>
                                <th className="border p-2">Tipo Doc</th>
                                <th className="border p-2">Documento</th>
                                <th className="border p-2">Nombre</th>
                                <th className="border p-2">Apellido</th>
                                <th className="border p-2">Mail</th>
                                <th className="border p-2">Fecha de colaboración</th>
                                <th className="border p-2">Forma de colaboración</th>
                                <th className="border p-2">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td className="border p-2">{row["Tipo Doc"]}</td>
                                    <td className="border p-2">{row.Documento}</td>
                                    <td className="border p-2">{row.Nombre}</td>
                                    <td className="border p-2">{row.Apellido}</td>
                                    <td className="border p-2">{row.Mail}</td>
                                    <td className="border p-2">{row["Fecha de colaboración"]}</td>
                                    <td className="border p-2">{row["Forma de colaboración"]}</td>
                                    <td className="border p-2">{row.Cantidad}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        type='submit'
                        className='mt-4 bg-primary text-white py-2 rounded-md hover:bg-primary-dark'
                    >
                        Confirmar
                    </button>
                </form>
            )}
        </div>
    );
};




// import React, { useState } from 'react';
// import Papa from 'papaparse';
// import { validarColaboraciones } from '@/app/helpers/colaboraciones';

// const CargarColaboracionesForm: React.FC = () => {
//     const [archivo, setArchivo] = useState<File | null>(null);
//     const [errores, setErrores] = useState<string[]>([]);
//     const [mensaje, setMensaje] = useState<string | null>(null);

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files) {
//             setArchivo(e.target.files[0]);
//         }
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!archivo) {
//             alert('Por favor, selecciona un archivo CSV.');
//             return;
//         }

//         const reader = new FileReader();

//         reader.onload = async event => {
//             const csvText = event.target?.result as string;

//             Papa.parse(csvText, {
//                 header: true,
//                 complete: async (results: { data: any }) => {
//                     const colaboraciones = results.data;
//                     const colaboracionesValidas = colaboraciones
//                         .map((row: any) => ({
//                             tipoDoc: row.TipoDoc ? row.TipoDoc.trim() : '',
//                             documento: row.Documento
//                                 ? row.Documento.trim()
//                                 : '',
//                             nombre: row.Nombre ? row.Nombre.trim() : '',
//                             apellido: row.Apellido ? row.Apellido.trim() : '',
//                             mail: row.Mail ? row.Mail.trim() : '',
//                             fechaColaboracion: row.FechaColaboracion
//                                 ? row.FechaColaboracion.trim()
//                                 : '',
//                             formaColaboracion: row.FormaColaboracion
//                                 ? row.FormaColaboracion.trim()
//                                 : '',
//                             cantidad: row.Cantidad ? row.Cantidad.trim() : ''
//                         }))
//                         .filter(
//                             (collab: any) => collab.tipoDoc && collab.documento
//                         );

//                     const validationErrors = validarColaboraciones(
//                         colaboracionesValidas
//                     );
//                     if (validationErrors.length > 0) {
//                         setErrores(validationErrors);
//                         setMensaje(null);
//                     } else {
//                         const response = await fetch('/api/colaboraciones', {
//                             method: 'POST',
//                             body: JSON.stringify(colaboracionesValidas)
//                         });

//                         const data = await response.json();

//                         if (!response.ok) {
//                             setErrores(data.errores);
//                             setMensaje(null);
//                         } else {
//                             setMensaje(data.mensaje);
//                             setErrores([]);
//                         }
//                     }
//                 },
//                 error: (error: any) => {
//                     console.error('Error al analizar el archivo CSV:', error);
//                     setErrores(['Error al analizar el archivo CSV.']);
//                 }
//             });
//         };

//         reader.readAsText(archivo);
//     };

//     return (
//         <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//             <h2 className='text-lg font-semibold'>Cargar Colaboraciones</h2>

//             <div>
//                 <label htmlFor='archivo' className='block text-sm font-medium'>
//                     Seleccionar archivo CSV:
//                 </label>
//                 <input
//                     type='file'
//                     id='archivo'
//                     accept='.csv'
//                     onChange={handleFileChange}
//                     required
//                     className='mt-1 p-2 border rounded-md w-full'
//                 />
//             </div>

//             {errores && errores.length > 0 && (
//                 <div className='text-red-600'>
//                     <h3>Errores:</h3>
//                     <ul>
//                         {errores.map((error, index) => (
//                             <li key={index}>{error}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {mensaje && <h3 className='text-green-600'>{mensaje}</h3>}

//             <button
//                 type='submit'
//                 className='mt-4 bg-primary text-white py-2 rounded-md hover:bg-primary-dark'
//             >
//                 Cargar
//             </button>
//         </form>
//     );
// };

// export default CargarColaboracionesForm;
