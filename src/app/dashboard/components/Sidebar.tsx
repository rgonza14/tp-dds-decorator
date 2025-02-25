'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useDashboard } from '@/store/dashboardStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DashboardNav from './DashboardNav';
import styles from './styles/sidebar.module.css';

type SidebarProps = {
    userId?: string;
    tipo_colaborador?: string;
};

export default function Sidebar({ userId, tipo_colaborador}: SidebarProps) {
    const { isMinimized, toggle } = useDashboard();

    const handleToggle = () => {
        toggle();
    };

    return (
        <aside
            className={cn(
                `fixed hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block top:0 bottom:0 p-4`,
                !isMinimized
                    ? styles['sidebar-expanded']
                    : styles['sidebar-collapsed'],
                styles['sidebar-custom']
            )}
        >
            <div className='avatar'>
                <Avatar
                    className={`mr-2 ${
                        isMinimized ? 'size-8' : 'size-12'
                    } transition transform`}
                >
                    <AvatarImage src={''} alt='logo del negocio' />
                    <AvatarFallback>smaa</AvatarFallback>
                </Avatar>
            </div>

            <ChevronLeft
                className={cn(
                    'absolute -right-3 top-10 z-50  cursor-pointer rounded-full border bg-background text-3xl text-foreground',
                    isMinimized && 'rotate-180'
                )}
                onClick={handleToggle}
            />
            <div className='navigation-list'>
                <DashboardNav userId={userId} tipo_colaborador={tipo_colaborador}/>
            </div>
        </aside>
    );
}
