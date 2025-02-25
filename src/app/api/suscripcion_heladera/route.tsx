import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const {cola_id, hela_id, suscripcionData} = await req.json();

        if(!cola_id || !hela_id || !suscripcionData) {
            return NextResponse.json({message: "cola_id, hela_id y suscripcionData son requereidos"}, {status: 400});
        }

        const nuevaSuscripcion = await prisma.suscripcion_heladera.upsert({
            where: {
                susc_colaborador: cola_id,
                susc_heladera: hela_id,
            },
            update: suscripcionData,
            create: suscripcionData
        });

        if(!nuevaSuscripcion){
            return NextResponse.json({
                message: "error en la carga de la suscripcion"
            }, {status: 400});
        }

        return NextResponse.json({nuevaSuscripcion: nuevaSuscripcion}, {status: 201})


    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }
}

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url);
        const cola_id = Number(searchParams.get("cola_id"));
        const hela_id = Number(searchParams.get("hela_id"));


        if(hela_id && cola_id) {
            const suscripcion = await prisma.suscripcion_heladera.findUnique({
                where: {
                    susc_colaborador_susc_heladera: {
                        susc_colaborador: cola_id,
                        susc_heladera: hela_id
                    }
                }
            });
            return NextResponse.json({suscripcion: suscripcion}, {status: 200})

        }

        if(cola_id) {
            const suscripciones = await prisma.suscripcion_heladera.findMany({
                where: {
                    susc_colaborador: cola_id
                }
            });
            return NextResponse.json({suscripciones: suscripciones}, {status: 200})
        }


        const suscripciones = await prisma.incidente.findMany();

        return NextResponse.json({suscripciones: suscripciones}, {status: 200})



    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }
}