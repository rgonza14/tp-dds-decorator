import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface RowData {
    "Tipo Doc": string;
    Documento: number;
    Nombre: string;
    Apellido: string;
    Mail: string;
    "Fecha de colaboración": string;
    "Forma de colaboración": string;
    Cantidad: number;
}

export async function POST(req: Request) {

    try {
        const {colaboracionesData} = await req.json();

        if(!colaboracionesData) {
            return NextResponse.json({message: "Colaboraciones no recibidas"},{status: 400});
        }

        colaboracionesData.array.forEach( (row: RowData) => {
            procesarData(row);
        });

    } catch(error: any) {
        console.error("Error en el servidor", error);
        return NextResponse.json({message: "Error en el servidor", error: error.message}, {status: 500})
    }

}

async function procesarData(row: RowData) {

}

async function existe(dniTipo: string, dniNro: string): Promise<boolean> {
    
    const persona = await prisma.persona_humana.findFirst({
        where: {
            ph_dni_tipo: dniTipo,
            ph_dni_nro: dniNro
        }
    });

    if(persona) {
        return true;
    } else {
        return false;
    }
}

async function crearColaboradorH(usuario: string, contrasena: string) {
    const saltRounds = 10;
    const contrasena_encriptada = await bcrypt.hash(contrasena, saltRounds);

    const colaborador = await prisma.colaborador.create({
        data: {
            cola_usuario: usuario,
            cola_contrasena: contrasena_encriptada,
            cola_tipo_colaborador: "persona_humana"
        }
    });

    return colaborador;
}

async function crearPersonaHumana(id: number, dniTipo: string, dniNro: string, nombre: string, apellido: string, mail: string) {

    const persona = await prisma.persona_humana.create({
        data: {
            ph_id: id,
            ph_nombre: nombre,
            ph_apellido: apellido,
            ph_dni_tipo: dniTipo,
            ph_dni_nro: dniNro,
            ph_mail: mail,
        }
    });

    return persona;
}




export async function GET() {
    const colaborador = await crearColaboradorH("sniper12345", "sniper12345");
    const persona = await crearPersonaHumana(colaborador.cola_id, "DNI", "12345678", "Franco", "Tirador", "sniper@gmail.com");

    return NextResponse.json({colaborador: colaborador, persona: persona}, {status:200})

}
