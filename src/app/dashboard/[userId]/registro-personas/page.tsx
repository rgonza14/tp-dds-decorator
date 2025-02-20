import Head from 'next/head';
import { PageContainer } from '../../components/PageContainer';
import FormRegistroPersona from './components/FormRegistroPersona';
import PersonasSection from './components/PersonasSection';

export default function RegistroPersonasPage() {
    return (
        <PageContainer>
            <Head>
                <title>Registrar Persona Vulnerable</title>
            </Head>
            <main>
                <PersonasSection />
            </main>
        </PageContainer>
    );
}
