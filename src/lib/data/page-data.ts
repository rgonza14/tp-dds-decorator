export interface Breadcrumb {
    title: string;
    link: string;
}

export interface PageData {
    title: string;
    description: string;
    breadcrumbs: Breadcrumb[];
}

export const getPageData = (
    pageName: string,
    userId: string | number
): PageData => {
    const data: Record<string, PageData> = {
        'puntos-y-canjes': {
            title: 'Puntos y canjes',
            description:
                'Realiza canjes según los puntos acumulados como recompensa por tu colaboración',
            breadcrumbs: [
                { title: 'Inicio', link: '/' },
                {
                    title: 'Puntos y canjes',
                    link: `/${userId}/puntos-y-canjes`
                }
            ]
        },
        heladeras: {
            title: 'Heladeras',
            description: 'Gestiona el alta y baja de las heladeras',
            breadcrumbs: [
                { title: 'Inicio', link: '/' },
                {
                    title: 'Heladeras',
                    link: `/${userId}/heladeras`
                }
            ]
        },
        heladerasPH: {
            title: 'Heladeras',
            description: 'Gestiona el alta y baja de las heladeras',
            breadcrumbs: [
                { title: 'Inicio', link: '/' },
                {
                    title: 'Heladeras',
                    link: `/${userId}/heladeras`
                }
            ]
        },
        'registro-personas': {
            title: 'Personas en Situación Vulnerable',
            description:
                'Gestiona el alta y baja de personas en situación vulnerable',
            breadcrumbs: [
                { title: 'Inicio', link: '/' },
                {
                    title: 'Registro Personas',
                    link: `/${userId}/registro-personas`
                }
            ]
        },
        viandas: {
            title: 'Viandas',
            description: 'Gestiona la carga de Viandas',
            breadcrumbs: [
                { title: 'Inicio', link: '/' },
                {
                    title: 'Viandas',
                    link: `/${userId}/viandas`
                }
            ]
        },
        donaciones: {
            title: 'Donaciones',
            description: 'Gestiona la carga de Donaciones de Dinero',
            breadcrumbs: [
                { title: 'Inicio', link: '/' },
                {
                    title: 'Donaciones',
                    link: `/${userId}/donaciones`
                }
            ]
        },
        distribucion: {
            title: 'Distribución de Viandas',
            description: 'Cargá los datos necesarios para distribuir viandas.',
            breadcrumbs: [
                { title: 'Inicio', link: '/' },
                {
                    title: 'Distribución de Viandas',
                    link: `/${userId}/distribucion`
                }
            ]
        },
        tecnicos: {
            title: 'Manejo Técnicos de Heladeras',
            description:
                'Gestiona el alta, baja y modificación de información de técnicos para el mantenimiento de las heladeras.',
            breadcrumbs: [
                { title: 'Inicio', link: '/' },
                {
                    title: 'Manejo Técnicos',
                    link: `/${userId}/tecnicos`
                }
            ]
        },
        'editar-perfil': {
            title: 'Editar Perfil',
            description: 'Editá tu información.',
            breadcrumbs: [
                { title: 'Inicio', link: '/' },
                {
                    title: 'Editar Perfil',
                    link: `/${userId}/editar-perfil`
                }
            ]
        },
        administradores: {
            title: 'Administradores',
            description: 'Edita información del los administradores',
            breadcrumbs: [
                { title: 'Inicio', link: '/' },
                {
                    title: 'Administradores',
                    link: `/${userId}/administradores`
                }
            ]
        },
        'cargar-colaboraciones': {
            title: 'Carga Masiva Colaboraciones',
            description: 'Carga varias colaboraciones juntas.',
            breadcrumbs: [
                { title: 'Inicio', link: '/' },
                {
                    title: 'Cargar Colaboraciones',
                    link: `/${userId}/cargar-colaboraciones`
                }
            ]
        }
    };

    return data[pageName];
};
