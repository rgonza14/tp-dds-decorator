import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {

    try {
        const {cola_id, personaData} = await req.json();
        if(!cola_id || !esPersonaValida(personaData)) {
            return NextResponse.json({message: "datos insuficientes"}, {status:400});
        }

        const nuevaPersona = await prisma.persona_situacion_vulnerable.create({
            data: {
                psv_colaborador: cola_id,
                ...personaData,
            }
        });

        if(!nuevaPersona) {
            return NextResponse.json({
                message: "Falla en la creación de la persona"
            }, {status: 400});
        }

        return NextResponse.json({
            persona: nuevaPersona,
            message: "persona en situación vulnerable registrada exitosamente"
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
            const personas = await prisma.persona_situacion_vulnerable.findMany({
                where: {psv_colaborador: cola_id}
            });
            if(!personas) {
                return NextResponse.json({message: "Personas no encontradas"}, {status: 404});
            }
            return NextResponse.json({
                personas: personas,
            },{status: 200});
        }

        const personas = await prisma.persona_situacion_vulnerable.findMany();
        if(!personas) {
            return NextResponse.json({message: "Personas no encontradas"}, {status: 404});
        }
        return NextResponse.json({
            personas: personas,
        },{status: 200});


        
    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }

}

export async function PUT(req: Request) {

    try {
        const {psv_id, personaData} = await req.json();
        if(!psv_id) {
            return NextResponse.json({message: "se requiere id de la persona"}, {status:400});
        }

        const personaActualizada = await prisma.persona_situacion_vulnerable.update({
            where: {
                psv_id: psv_id
            },
            data: personaData
        });

        if(!personaActualizada) {
            return NextResponse.json({
                message: "Falla en la edicion de la persona"
            }, {status: 400});
        }

        return NextResponse.json({
            persona: personaActualizada,
            message: "persona en situación vulnerable editada exitosamente"
        }, {status: 201});

    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }

}

export async function DELETE(req: Request) {
    try {
        const {psv_id} = await req.json();
        console.log("--> DELETE ID:", psv_id);
        if(!psv_id) {
            return NextResponse.json({message: "Se requiere el ID para poder realizar dar de baja una persona"}, {status: 400})
        }

        const personaEliminada = await prisma.persona_situacion_vulnerable.update({
            where: {psv_id: Number(psv_id)},
            data: {
                psv_baja: true
            }
        });

        console.log(personaEliminada);

        if(!personaEliminada) {
            return NextResponse.json({message: `No se encontró la persona id:${psv_id}`}, {status: 404})
        }

        return NextResponse.json({
            message: "persona Eliminada",
            persona: personaEliminada,
        }, {status: 200});



    } catch(error: any) {
        console.error("Error en el servidor", error);
        return NextResponse.json({message: "Error en el servidor", error: error.message}, {status: 500})
    }
}


function esPersonaValida(personaData: any) {

    if(!personaData.psv_nombre ||
    !personaData.psv_fecha_nacimiento ||
    !personaData.psv_fecha_registro ||
    !personaData.psv_dni_tipo ||
    !personaData.psv_dni_nro ||
    personaData.psv_menores_a_cargo<0){
        return false;
    } else {
        return true;
    }

}