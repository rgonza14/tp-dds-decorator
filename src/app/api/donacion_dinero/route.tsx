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