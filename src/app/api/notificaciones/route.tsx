import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url);
        const cola_id = Number(searchParams.get("cola_id"));


        if(!cola_id) {
            return NextResponse.json({message: "Se requiere id del colaborador"}, {status: 400})

        }

        const suscripciones = await prisma.suscripcion_heladera.findMany({
            where: {
                susc_colaborador: cola_id
            }
        });

        const notificaciones: any[] = [];
        for (const suscripcion of suscripciones) {
            const heladera = await getHeladera(suscripcion.susc_heladera);
            const viandasDisponibles = await getCapacidadOcupada(suscripcion.susc_heladera);
            const viandasFaltantes = Number(heladera.hela_capacidad) - viandasDisponibles;

            const notificacion = {
                ...suscripcion,
                ...heladera,
                viandasDisponibles,
                viandasFaltantes
            }

            notificaciones.push(notificacion);
        }

        return NextResponse.json({notificaciones: notificaciones}, {status: 200})



    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }

}

async function getHeladera(hela_id: number) {
    const heladera = await prisma.heladera.findUniqueOrThrow({
        where: {
            hela_id: hela_id
        }
    });

    return heladera;
}

async function getCapacidadOcupada(hela_id: number) {
    const capacidadOcupada = await prisma.donacion_vianda.count({
        where: {dv_heladera: hela_id}
    });
    return capacidadOcupada;
}