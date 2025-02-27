import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const {tecnicoData} = await req.json();

        if(!tecnicoData) {
            
            return NextResponse.json({message: "datos insuficientes"}, {status:400});
        }

        const nuevoTecnico = await prisma.tecnico.create({
            data: tecnicoData
        });

        if(!nuevoTecnico) {
            return NextResponse.json({
                message: "Falla en la creación del técnico"
            }, {status: 400});
        }

        return NextResponse.json({
            persona: nuevoTecnico,
            message: "Técnico registrado exitosamente"
        }, {status: 201});


    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }

}

export async function GET(req: Request) {
    try {

        const tecnicos = await prisma.tecnico.findMany();
        return NextResponse.json({
            tecnicos: tecnicos,
        },{status: 200});

        

    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }

}

export async function PUT(req: Request) {
    try {
        const {tec_id, tecnicoData} = await req.json();

        if(!tec_id) {
            return NextResponse.json({message: "se requiere id del técnico"}, {status:400});
        }

        const tecnicoActualizado = await prisma.tecnico.update({
            where: {tec_id: tec_id},
            data: tecnicoData
        });

        if(!tecnicoActualizado) {
            return NextResponse.json({
                message: "Falla en la edicion del técnico"
            }, {status: 400});
        }

        return NextResponse.json({
            persona: tecnicoActualizado,
            message: "Técnico editado exitosamente"
        }, {status: 201});


    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }

}

export async function DELETE(req: Request) {
    try {
        const {tec_id} = await req.json();
        console.log("--> DELETE ID:", tec_id);
        if(!tec_id) {
            return NextResponse.json({message: "Se requiere el ID para poder realizar dar de baja un técnico"}, {status: 400})
        }

        const tecnicoEliminado = await prisma.tecnico.update({
            where: {tec_id: Number(tec_id)},
            data: {
                tec_baja: true
            }
        });

        console.log(tecnicoEliminado);

        if(!tecnicoEliminado) {
            return NextResponse.json({message: `No se encontró el técnico id:${tec_id}`}, {status: 404})
        }

        return NextResponse.json({
            message: "Técnico Eliminado",
            tecnico: tecnicoEliminado,
        }, {status: 200});



    } catch(error: any) {
        console.error("Error en el servidor", error);
        return NextResponse.json({message: "Error en el servidor", error: error.message}, {status: 500})
    }
}