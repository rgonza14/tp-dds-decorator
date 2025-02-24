import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req:Request) {

    try {
        const {hela_id, incidenteData} = await req.json();


        if(!hela_id || !incidenteData) {
            return NextResponse.json({message: "hela_id e incidenteData son requereidos"}, {status: 400});
        }

        const nuevoIncidente = await prisma.incidente.create({
            data: {
                inc_heladera: hela_id,
                ...incidenteData
            }
        });

        if(!nuevoIncidente){
            return NextResponse.json({
                message: "Error en la base de datos"
            }, {status: 200});
        }

        return NextResponse.json({nuevoIncidente: nuevoIncidente}, {status: 201});

    } catch(error) {
        console.error(error);
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }
}

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url);
        const hela_id = Number(searchParams.get("hela_id"));


        if(hela_id) {
            const incidentes = await prisma.incidente.findMany({
                where: {
                    inc_heladera: hela_id
                }
            });
            return NextResponse.json({incidentes: incidentes}, {status: 200})
        }


        const incidentes = await prisma.incidente.findMany();

        return NextResponse.json({incidentes: incidentes}, {status: 200})



    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }
}