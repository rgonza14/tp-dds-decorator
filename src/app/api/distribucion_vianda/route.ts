import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    console.log("--> POST /api/distribucion_vianda");
    try {
        const {cola_id, hela_id_origen, hela_id_destino, viandasData} = await req.json();
        
        console.log("--> datos: ");
        console.log(cola_id, hela_id_origen, hela_id_destino, viandasData);

        if(!cola_id || !hela_id_origen || !hela_id_destino || !viandasData) {
            return NextResponse.json({message: "cola_id, heladeraOrigen, heladeraDestino y viandas son requeridos"}, {status: 400});
        }

        const heladeraDestino = await prisma.heladera.findUnique({
            where: {hela_id: hela_id_destino}
        });
        const capacidadOcupada = await prisma.donacion_vianda.count({
            where: {dv_heladera: hela_id_destino}
        });

        const capacidadDisponible = Number(heladeraDestino) - Number(capacidadOcupada)

        if(capacidadDisponible < viandasData.length) {
            return NextResponse.json({message: "no hay espacio suficiente en la heladera destino"}, {status: 400});
        }


        const updates = viandasData.map(
            (vianda: string) => {
                return prisma.donacion_vianda.update({
                    where: {dv_id: Number(vianda)},
                    data: {
                        dv_heladera: hela_id_destino,
                        dv_estado: "pendiente distribucion"

                    }
                });
            }
        );

        const resultados = await Promise.allSettled(updates);
        const exitosos = resultados.filter(r => r.status === "fulfilled").map(r => r.value);

        return NextResponse.json({
            message: `Se actualizó la heladera de ${exitosos.length} viandas y se les asignó el estado "pendiente distribucion"`,
            viandasActualizadas: exitosos
        }, {status: 200})


    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }
}