import Head from 'next/head';
import { PageContainer } from '../../components/PageContainer';
import PersonasSection from './components/PersonasSection';

export default function RegistroPersonasPage() {
    return (
        <PageContainer>
            <Head>
                <title>Gestión de personas vulnerables</title>
            </Head>
            <main>
                <PersonasSection />
            </main>
        </PageContainer>
    );
}
