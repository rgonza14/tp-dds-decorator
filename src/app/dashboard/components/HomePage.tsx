'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './styles/homePage.module.css';
import HeladerasSection from '../[userId]/heladeras/components/HeladerasSection';
import Notificaciones from './Notificaciones';

export default function HomePage({ userId, tipo_colaborador }:  {userId: string|null, tipo_colaborador: string|null}) {
    const router = useRouter();

    return (
        <div className={styles.local}>
            <section className={styles.section}>
                <h1 className={styles.title}>
                    Bienvenido a la Plataforma de Contribuciones!
                </h1>
            </section>

            {tipo_colaborador==="persona_humana" && <Notificaciones/>}

            <section className={styles.section}>
                <h2 className={styles.title}>
                    Ubicación de las heladeras disponibles
                </h2>
                <HeladerasSection />
            </section>
        </div>
    );
};


