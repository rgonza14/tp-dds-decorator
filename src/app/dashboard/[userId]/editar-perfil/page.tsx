"use client";
import { PageContainer } from '../../components/PageContainer';
import EditarPerfilPH from './components/EditarPerfilPH';
import EditarPerfilPJ from './components/EditarPerfilPJ';

export default function EditarPerfilPage() {
    const tipo_colaborador = localStorage.getItem("tipo_colaborador");

    switch(tipo_colaborador) {
        case "persona_humana":
            return (
                <PageContainer>
                    <EditarPerfilPH />
                </PageContainer>
            );
        break;
        case "persona_juridica":
            return (
                <PageContainer>
                    <EditarPerfilPJ />
                </PageContainer>
            );
        break;
        default:
            return (
                <PageContainer>
                    <p>Error en el tipo de usuario</p>
                </PageContainer>
            );
        break;
    }
}