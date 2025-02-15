'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        console.log('userId_: ', userId);
        if (userId) {
            redirect('/dashboard');
        } else {
            redirect('/auth');
        }
    }, []);
};

export default Page;

