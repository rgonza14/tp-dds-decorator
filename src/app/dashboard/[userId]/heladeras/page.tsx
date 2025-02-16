'use client';
import { useState } from 'react';
import React from 'react';
import RegistroHeladera from './components/RegistroHeladera';
import BajaHeladera from './components/BajaHeladera';
import EdicionHeladera from './components/EdicionHeladera';
import { PageContainer } from '../../components/PageContainer';
import HeladerasSection from './components/HeladerasSection';
import RecomendacionesHeladeras from '@/app/dashboard/components/RecomendacionesHeladeras';



export default function Heladeras() {
    const userId = localStorage.getItem("userId")
    const [abrirRegistro, setAbrirRegistro] = useState<boolean>(false);
    const [abrirBaja, setAbrirBaja] = useState<boolean>(false);
    const [abrirEdicion, setAbrirEdicion] = useState<boolean>(false);

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
                                setAbrirBaja(false);
                                setAbrirEdicion(false);
                            }}
                            className='bg-blue-600 text-white py-2 px-4 rounded-md shadow-lg transition transform hover:bg-blue-500 hover:scale-105'
                        >
                            Registro de Heladeras
                        </button>
                        <button
                            onClick={() => {
                                setAbrirRegistro(false);
                                setAbrirBaja(false);
                                setAbrirEdicion(true);
                            }}
                            className='bg-blue-600 text-white py-2 px-4 rounded-md shadow-lg transition transform hover:bg-blue-500 hover:scale-105'
                        >
                            Edición de Información de Heladeras
                        </button>
                        <button
                            onClick={() => {
                                setAbrirRegistro(false);
                                setAbrirBaja(true);
                                setAbrirEdicion(false);
                            }}
                            className='bg-blue-600 text-white py-2 px-4 rounded-md shadow-lg transition transform hover:bg-blue-500 hover:scale-105'
                        >
                            Baja de Heladeras
                        </button>
                    </div>
                </section>
                {abrirRegistro && <RegistroHeladera />}
                {abrirEdicion && <EdicionHeladera />}
                {abrirBaja && <BajaHeladera />}
            </div>
        </PageContainer>
    );
};
