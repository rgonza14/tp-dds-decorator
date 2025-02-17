import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {

    try {
        
        const {cola_id, donacionDineroData} = await req.json();

        if(!cola_id || !donacionDineroData) {
            return NextResponse.json({message: "cola_id e informacion de la donación son requeridos"}, {status: 400});
        }
        

        const nuevaDonacionDinero = await prisma.donacion_dinero.create({
            data: {
                ...donacionDineroData,
                dd_colaborador: Number(cola_id),
            }
        });
        
        return NextResponse.json({
            donacion_dinero: nuevaDonacionDinero,
        }, {status: 201});

    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }
}

export async function GET(req: Request) {

    try {
        const {searchParams} = new URL(req.url);
        const cola_id = Number(searchParams.get("cola_id"));

        if(cola_id) {
            const donaciones = await prisma.donacion_dinero.findMany({
                where: {dd_colaborador: cola_id}
            });
            if(!donaciones) {
                return NextResponse.json({message: "Donaciones no encontradas"}, {status: 404})
            }
            return NextResponse.json({donaciones: donaciones}, {status: 200})
        } else {
            const donaciones = await prisma.donacion_dinero.findMany();
            if(!donaciones) {
                return NextResponse.json({message: "Donaciones no encontradas"}, {status: 404})
            }
            return NextResponse.json({donaciones: donaciones}, {status: 200})

        }

    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }
}