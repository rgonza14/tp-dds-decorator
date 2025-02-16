import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    
    console.log("--> POST heladera")

    try {
        
        const {cola_id, heladeraData} = await req.json();
        console.log("-->data: ", cola_id, heladeraData)

        

        const nuevaHeladera = await prisma.heladera.create({
            data: {
                ...heladeraData,
                hela_colaborador: Number(cola_id),
                hela_estado: "activo"
            }
        });

        
        console.log("--> se inserto la heladera: ", nuevaHeladera);
        return NextResponse.json({
            message: "heladera cargada con exito",
            heladera: nuevaHeladera,
        }, {status: 201});

    } catch(error) {
        console.log("-->POST heladera ARROJO ERROR!", error);
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }
}