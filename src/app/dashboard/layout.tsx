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

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        console.log('userId: ', userId);
        if (userId) {
            setUserId(userId);
        } else {
            redirect('/auth');
        }
    }, []);

    return (
        <div className='flex h-full'>
            <Sidebar userId={userId} />
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
