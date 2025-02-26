
import Head from 'next/head';
import { PageContainer } from '../../components/PageContainer';
import TecnicosSection from './components/TecnicosSection';

export default function RegistroPersonasPage() {
    return (
        <PageContainer>
            <Head>
                <title>Gestión de técnicos</title>
            </Head>
            <main>
                <TecnicosSection />
            </main>
        </PageContainer>
    );
}