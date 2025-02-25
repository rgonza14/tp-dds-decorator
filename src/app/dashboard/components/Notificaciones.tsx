'use client';
import React from 'react';
import { useState, useEffect } from 'react';

export default function Notificaciones() {
    const [userId, setUserId] = useState<number|"">('');

    useEffect(() => {
        setUserId(Number(localStorage.getItem("userId")));
    }, []);
    return (
        <div>
            <div>Notificaciones: </div>
        </div>

    );
}