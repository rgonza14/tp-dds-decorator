'use client';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DashboardLayout({
    children,
    modal
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [tipo_colaborador, setTipo_colaborador] = useState<string | undefined>(undefined);

    useEffect(() => {
        const id = localStorage.getItem('userId');
        const tipo = localStorage.getItem("tipo_colaborador");
        console.log('userId: ', id);
        if (id) {
            setUserId(id);
            setTipo_colaborador(String(tipo));
        } else {
            redirect('/auth');
        }
    }, []);

    return (
        <div className='flex h-full'>
            <Sidebar userId={userId} tipo_colaborador={tipo_colaborador} />
            <main className='w-full flex-1 overflow-hidden'>
                <Header />
                <div
                    style={{
                        padding: '2rem',
                        marginLeft: '75px'
                    }}
                >
                    {children}

                    {modal}
                </div>
            </main>
        </div>
    );
}
