'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import { PageContainer } from '../../components/PageContainer';
import HeladerasSection from './components/HeladerasSection';
import CargaIncidente from './components/CargaIncidente';
import SuscripcionHeladera from './components/SuscripcionHeladera';



export default function Heladeras() {
    const [userId, setUserId] = useState<number|"">('');
    useEffect(() => {
        setUserId(Number(localStorage.getItem("userId")))
    },[]);
    const [abrirIncidente, setAbrirIncidente] = useState<boolean>(false);
    const [abrirSuscripcion, setabrirSuscripcion] = useState<boolean>(false);

    return (
        <PageContainer>
            <div className='flex flex-col gap-4'>
                <h1 className='text-2xl font-bold'>Gestión de Heladeras</h1>
                <HeladerasSection />
                <h1 className='text-2xl font-bold'>Recomendación de puntos para nuevas Heladeras</h1>
                <section>
                    <h2 className='text-lg font-semibold'>
                        Opciones de Gestión
                    </h2>
                    <div className='flex justify-around mt-4'>

                        <button
                            onClick={() => {
                                setAbrirIncidente(true);
                                setabrirSuscripcion(false)
                            }}
                            className='bg-red-600 text-white py-2 px-4 rounded-md shadow-lg transition transform hover:bg-red-500 hover:scale-105'
                        >
                            Cargar Incidente
                        </button>

                        <button
                            onClick={() => {
                                setAbrirIncidente(false);
                                setabrirSuscripcion(true);
                            }}
                            className='bg-green-600 text-white py-2 px-4 rounded-md shadow-lg transition transform hover:bg-red-green hover:scale-105'
                        >
                            Suscribirse
                        </button>

                    </div>
                </section>
                {abrirIncidente && <CargaIncidente />}
                {abrirSuscripcion && <SuscripcionHeladera />}
            </div>
        </PageContainer>
    );
};
