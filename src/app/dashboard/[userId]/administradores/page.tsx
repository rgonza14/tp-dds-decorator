
import Head from 'next/head';
import { PageContainer } from '../../components/PageContainer';
import AdministradoresSection from './components/AdministradoresSection';

export default function RegistroPersonasPage() {
    return (
        <PageContainer>
            <Head>
                <title>Gestión de técnicos</title>
            </Head>
            <main>
                <AdministradoresSection />
            </main>
        </PageContainer>
    );
}