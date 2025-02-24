'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import RegistroHeladera from './components/RegistroHeladera';
import EdicionHeladera from './components/EdicionHeladera';
import { PageContainer } from '../../components/PageContainer';
import HeladerasSection from './components/HeladerasSection';
import RecomendacionesHeladeras from '@/app/dashboard/components/RecomendacionesHeladeras';
import CargaIncidente from './components/CargaIncidente';



export default function Heladeras() {
    const [userId, setUserId] = useState<number|"">('');
    useEffect(() => {
        setUserId(Number(localStorage.getItem("userId")))
    },[]);

    const [abrirRegistro, setAbrirRegistro] = useState<boolean>(false);
    const [abrirEdicion, setAbrirEdicion] = useState<boolean>(false);
    const [abrirIncidente, setAbrirIncidente] = useState<boolean>(false);

    return (
        <PageContainer>
            <div className='flex flex-col gap-4'>
                <h1 className='text-2xl font-bold'>Gestión de Heladeras</h1>
                <HeladerasSection />
                <h1 className='text-2xl font-bold'>Recomendación de puntos para nuevas Heladeras</h1>
                <RecomendacionesHeladeras />
                <section>
                    <h2 className='text-lg font-semibold'>
                        Opciones de Gestión
                    </h2>
                    <div className='flex justify-around mt-4'>

                        <button
                            onClick={() => {
                                setAbrirRegistro(true);
                                setAbrirEdicion(false);
                                setAbrirIncidente(false);
                            }}
                            className='bg-blue-600 text-white py-2 px-4 rounded-md shadow-lg transition transform hover:bg-blue-500 hover:scale-105'
                        >
                            Registro de Heladeras
                        </button>

                        <button
                            onClick={() => {
                                setAbrirRegistro(false);
                                setAbrirEdicion(true);
                                setAbrirIncidente(false);
                            }}
                            className='bg-blue-600 text-white py-2 px-4 rounded-md shadow-lg transition transform hover:bg-blue-500 hover:scale-105'
                        >
                            Edición y baja de Heladeras
                        </button>

                        <button
                            onClick={() => {
                                setAbrirRegistro(false);
                                setAbrirEdicion(false);
                                setAbrirIncidente(true);
                            }}
                            className='bg-red-600 text-white py-2 px-4 rounded-md shadow-lg transition transform hover:bg-red-500 hover:scale-105'
                        >
                            Cargar Incidente
                        </button>

                    </div>
                </section>
                {abrirRegistro && <RegistroHeladera />}
                {abrirEdicion && <EdicionHeladera />}
                {abrirIncidente && <CargaIncidente />}
            </div>
        </PageContainer>
    );
};
