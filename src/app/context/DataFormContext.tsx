'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface DataForm {
    usuario: string;
    password: string;
    password2: string;
    personaJuridica: boolean;
    ayudarPersonas: boolean;
}

type DataFormContextType = {
    dataForm: DataForm;
    setDataForm: React.Dispatch<React.SetStateAction<any>>;
};

export const DataFormContext = createContext<DataFormContextType | undefined>(
    undefined
);

// Fede: otro conflicto de merge, acepte el current que tenia esta pieza de codigo comentado, como el resto de la funcion en la cual se encuentra (la otra opcion era el use effect suelto en el archivo...)
// descomente porque lo usaban las paginas en auth.
export const DataFormProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [dataForm, setDataForm] = useState<any>(null);

    useEffect(() => {
        console.log('dataFormContext: ', dataForm)
    },[dataForm])

    return (
        <DataFormContext.Provider value={{ dataForm, setDataForm }}>
            {children}
        </DataFormContext.Provider>
    );
};

export const useDataForm = () => {
    const context = useContext(DataFormContext);
    console.log('context: ', context);
    if (!context) {
        throw new Error('useDataForm must be used within a DataFormProvider');
    }
    return context;
};
