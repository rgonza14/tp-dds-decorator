import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {

    try {
        
        const {cola_id, heladeraData} = await req.json();

        

        const nuevaHeladera = await prisma.heladera.create({
            data: {
                ...heladeraData,
                hela_colaborador: Number(cola_id),
                hela_estado: "activo"
            }
        });
        
        return NextResponse.json({
            heladera: nuevaHeladera,
        }, {status: 201});

    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }
}

export async function GET(req: Request) {
    

    try {
        const {searchParams} = new URL(req.url);
        const cola_id = Number(searchParams.get("cola_id"));
        const hela_id = Number(searchParams.get("hela_id"));

        if(hela_id) {
            // buscar la heladera por id
            const heladera = await prisma.heladera.findUnique({
                where: {hela_id: hela_id}
            });
            if(!heladera) {
                return NextResponse.json({message: "Heladera no encontrada"}, {status: 404});
            }
            return NextResponse.json({heladera: heladera}, {status: 200});
        } else if(cola_id) {
            // buscar las heladeras de ese colaborador
            const heladeras = await prisma.heladera.findMany({
                where: {hela_colaborador: cola_id}
            });
            return NextResponse.json({heladeras: heladeras}, {status: 200});
        } else {
            // buscar todas las heladeras
            const heladeras = await prisma.heladera.findMany();
            return NextResponse.json({heladeras: heladeras}, {status: 200});
        }





    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }
}