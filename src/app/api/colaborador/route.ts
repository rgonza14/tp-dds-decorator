import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// TODO GET POST PUT DELETE para colaborador (con su persona)

export async function GET(req: Request) {

    try {
        // obtener id del url
        const {searchParams} = new URL(req.url);
        const cola_id = Number(searchParams.get("cola_id"));
        const tipo_colaborador = searchParams.get("tipo_colaborador");

        if(tipo_colaborador) {
            const colaboradores = await prisma.colaborador.findMany({
                where: {cola_tipo_colaborador: tipo_colaborador},
                include: {persona_humana: true}
            });
            return NextResponse.json({colaboradores: colaboradores}, {status: 200});
        }

    
        // si no existe id devoler error
        // TODO ver si conviene devolver en este caso un listado con TODOS los colaboradores
        if(!cola_id) {
            return NextResponse.json({message: "Se requiere un id (cola_id)"}, {status: 400})
        }
    
        // obtener el colaborador
        const colaborador = await prisma.colaborador.findUnique({
            where: {cola_id: cola_id}
        });
    
        // si no se encuentra el colaborador, devolver error
        if(!colaborador) {
            return NextResponse.json({ message: "Colaborador no encontrado" }, { status: 404 });
        }

        // buscar la persona humana o juridica asociada
        const persona = await getPersona(colaborador)

        if(!persona) {
            return NextResponse.json({message: "Persona humana o juridica asociada al colaborador no encontrada"}, {status: 404});
        }

        return NextResponse.json({colaborador: colaborador, persona: persona}, {status: 200});
        

    } catch(error: any) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ message: "Error en el servidor", error: error.message }, { status: 500 });

    }


}

export async function PUT(req: Request) {

    try {
        const {cola_id, colaboradorData, personaData} = await req.json();
        if(!cola_id) {
            return NextResponse.json({message: "Se requiere el ID para poder realizar actualizaciones en un colaborador"}, {status: 400})
        }
        const colaborador = colaboradorData ?? await prisma.colaborador.findUnique({
            where: {cola_id: Number(cola_id)}
        });
        
        const persona = personaData ?? await getPersona(colaborador);

        if(!colaborador || !persona) {
            return NextResponse.json({message: "No se encontró el colaborador en la base de datos"}, {status: 404})
        }

        let personaActualizada = null;

        switch(colaborador.cola_tipo_colaborador) {
            case "persona_juridica":
                personaActualizada = await prisma.persona_juridica.update({
                    where: {pj_id: Number(cola_id)},
                    data: persona
                })
            break;
            case "persona_humana":
                personaActualizada = await prisma.persona_humana.update({
                    where: {ph_id: Number(cola_id)},
                    data: persona
                })
            break;
        }

        let colaboradorActualizado = await prisma.colaborador.update({
            where: {cola_id: Number(cola_id)},
            data: colaborador
        })

        return NextResponse.json({
            message: "Colaborador Actualizado",
            colaborador: colaboradorActualizado,
            persona: personaActualizada
        }, {status: 200});

    } catch(error: any) {
        console.error("Error en el servidor", error);
        return NextResponse.json({message: "Error en el servidor", error: error.message}, {status: 500})
    }

}

async function getPersona(colaborador: any) {


    switch(colaborador.cola_tipo_colaborador) {
        case "persona_juridica":
            const pj = await prisma.persona_juridica.findUnique({
                where: {pj_id: colaborador.cola_id}
            })
            return pj;
        break;
        case "persona_humana":
            const ph = await prisma.persona_humana.findUnique({
                where: {ph_id: colaborador.cola_id}
            });
            return ph;
        break;
        case "admin":
            const phadmin = await prisma.persona_humana.findUnique({
                where: {ph_id: colaborador.cola_id}
            });
            return phadmin;
        break;
        default:
            return null;
        break;
    }

}