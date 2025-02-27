import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const {cola_id, hela_id_origen, hela_id_destino, motivo, fecha, viandasData} = await req.json();
        
        console.log("--> datos: ");
        console.log(cola_id, hela_id_origen, hela_id_destino, motivo, fecha, viandasData);

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
                        dv_estado: "pendiente_entrega"

                    }
                });
            }
        );

        const resultados = await Promise.allSettled(updates);
        const exitosos = resultados.filter(r => r.status === "fulfilled").map(r => r.value);

        const nuevaDistribucion = await prisma.distribucion_vianda.create({
            data: {
                dist_colaborador: cola_id,
                dist_heladera_origen: hela_id_origen,
                dist_heladera_destino: hela_id_destino,
                dist_estado: "pendiente de entrega",
                dist_cantidad: exitosos.length,
                dist_motivo: motivo,
                dist_fecha: fecha
            }
        })

        if(!nuevaDistribucion){
            return NextResponse.json({
                message: `Se actualizó la heladera de ${exitosos.length} viandas y se les asignó el estado "pendiente distribucion"`,
                viandasActualizadas: exitosos
            }, {status: 200})
        } else {
            return NextResponse.json({
                message: `Se cargo la distribucion y se actualizó la heladera de ${exitosos.length} viandas y se les asignó el estado "pendiente distribucion"`,
                viandasActualizadas: exitosos
            }, {status: 201})

        }

        


    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }
}

export async function GET(req: Request) {

    try {
        const {searchParams} = new URL(req.url);
        const cola_id = Number(searchParams.get("cola_id"));

        if(!cola_id) {
            return NextResponse.json({message: "Se requiere id del colaborador"}, {status:400});
        }
        
        const distribuciones = await prisma.distribucion_vianda.findMany({
            where: {dist_colaborador: cola_id}
        });

        if(!distribuciones) {
            return NextResponse.json({message: "Distribuciones no encontradas"}, {status: 404});
        }
        return NextResponse.json({
            distribuciones: distribuciones,
        },{status: 200});
        
        
    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }

}