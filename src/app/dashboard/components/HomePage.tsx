'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './styles/homePage.module.css';
import HeladerasSection from '../[userId]/heladeras/components/HeladerasSection';
import Notificaciones from './Notificaciones';

export default function HomePage({ userId }:  {userId: string|null}) {
    const router = useRouter();

    return (
        <div className={styles.local}>
            <section className={styles.section}>
                <h1 className={styles.title}>
                    Bienvenido a la Plataforma de Contribuciones!
                </h1>
            </section>
            <section className={styles.section}>
                <h1 className={styles.title}>
                🔔Notificaciones🔔
                </h1>
                <Notificaciones/>
            </section>

            <section className={styles.section}>
                <h2 className={styles.title}>
                    Ubicación de las heladeras disponibles
                </h2>
                <HeladerasSection />
            </section>
        </div>
    );
};


