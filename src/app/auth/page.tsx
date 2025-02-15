'use client';
import { DataFormProvider } from '../context/DataFormContext';
import RegistroComponent from './registro/page';

export default function AuthRegistroPage() {

    return (
        <DataFormProvider>
            <RegistroComponent />
        </DataFormProvider>
    );
}
