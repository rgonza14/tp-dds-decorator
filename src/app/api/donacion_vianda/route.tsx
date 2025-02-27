import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {

    try {
        
        const {cola_id, donacionViandaData, cantidad} = await req.json();
        
        if(!cola_id || !donacionViandaData) {
            return NextResponse.json({message: "cola_id e informacion de la vianda son requeridos"}, {status: 400});
        }
        
        const cantidadViandas = cantidad ?? 1;
        
        // Comprobar le capcaidad disponible de la heladera
        const capacidadOcupada = await prisma.donacion_vianda.count({
            where: {dv_heladera: donacionViandaData.dv_heladera}
        });
        const heladera = await prisma.heladera.findUnique({
            where: {hela_id: donacionViandaData.dv_heladera}
        });
        if(!heladera) {
            return NextResponse.json({message: "No se encontró la heladera seleccionada, vuelva a intentar"}, {status: 404});

        }
        
        if (heladera?.hela_estado != "activa") {
            return NextResponse.json({message: "La heladera destiono no está activa"}, {status: 400});

        }
        // si no hay suficiente espacio en la heladera, retornar error
        const capacidadDisponible: number = Number(heladera?.hela_capacidad) - capacidadOcupada
        if(capacidadDisponible < cantidadViandas) {
            return NextResponse.json({message: "La heladera destino no tiene suficiente espacio disponible"}, {status: 400});
        }



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
                where: {
                    dv_heladera: hela_id,
                    dv_estado: "entregada"
                }
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