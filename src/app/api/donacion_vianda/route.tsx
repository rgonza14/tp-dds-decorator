import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {

    try {
        
        const {cola_id, donacionViandaData, cantidad} = await req.json();
        
        if(!cola_id || !donacionViandaData) {
            return NextResponse.json({message: "cola_id e informacion de la vianda son requeridos"}, {status: 400});
        }
        
        const cantidadViandas = cantidad ?? 1

        const cantidadViandasCreadas = await prisma.donacion_vianda.createMany({
            data: Array(cantidadViandas).fill({...donacionViandaData, dv_colaborador: Number(cola_id)})
        });
        
        return NextResponse.json({
            cantidadViandasCreadas: cantidadViandasCreadas,
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

        if(cola_id) {
            const donaciones = await prisma.donacion_vianda.findMany({
                where: {dv_colaborador: cola_id}
            });
            if(!donaciones) {
                return NextResponse.json({message: "Donaciones no encontradas"}, {status: 404})
            }
            return NextResponse.json({donaciones: donaciones}, {status: 200})
        }
        
        if(hela_id) {
            const donaciones = await prisma.donacion_vianda.findMany({
                where: {dv_heladera: hela_id}
            });
            if(!donaciones) {
                return NextResponse.json({message: "Donaciones no encontradas"}, {status: 404})
            }
            return NextResponse.json({donaciones: donaciones}, {status: 200})
        }
        
        const donaciones = await prisma.donacion_vianda.findMany();
        if(!donaciones) {
            return NextResponse.json({message: "Donaciones no encontradas"}, {status: 404})
        }
        return NextResponse.json({donaciones: donaciones}, {status: 200})
        
    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }
}