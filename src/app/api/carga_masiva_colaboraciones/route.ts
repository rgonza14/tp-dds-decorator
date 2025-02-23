import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { Row } from "@tanstack/react-table";

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

        const colaboraciones = colaboracionesData.map( (row: RowData) => {
            return procesarData(row);

        });
        
        return NextResponse.json({
            colaboraciones: colaboraciones,
            message: "colaboraciones cargadas"},
        {status: 201});

    } catch(error: any) {
        console.error("Error en el servidor", error);
        return NextResponse.json({message: "Error en el servidor", error: error.message}, {status: 500})
    }

}

async function procesarData(row: RowData) {
    var cola_id = await existe(row["Tipo Doc"], String(row.Documento))
    if(!cola_id) {
        const colaborador = await crearColaboradorH(String(row.Nombre)+String(row.Documento), String(row.Nombre)+String(row.Documento));
        const persona = await crearPersonaHumana(colaborador.cola_id, row["Tipo Doc"], String(row.Documento), row.Nombre, row.Apellido, row.Mail);
        cola_id = colaborador.cola_id;
    }
    var colaboracion = null;
    switch(row["Forma de colaboración"]) {
        case "DINERO":
            colaboracion = await prisma.donacion_dinero.create({
                data:{
                    dd_colaborador: cola_id,
                    dd_fecha: row["Fecha de colaboración"],
                    dd_frecuencia: "una vez",
                    dd_monto: row.Cantidad
                }
            });
        break;
        case "DONACION_VIANDAS":
            colaboracion = [];
            for(let i = 0; i < row.Cantidad; i++) {
                const donacion = await prisma.donacion_vianda.create({
                    data: {
                        dv_colaborador: cola_id,
                        dv_fecha_doncacion: row["Fecha de colaboración"]
                    }
                });
                colaboracion.push(donacion);
            }
        break;
        case "REDISTRIBUCION_VIANDAS":
            colaboracion = await prisma.distribucion_vianda.create({
                data: {
                    dist_colaborador: cola_id,
                    dist_fecha: row["Fecha de colaboración"],
                    dist_cantidad: row.Cantidad,
                    dist_estado: "entregado"
                }
            })
        break;
        case "ENTREGA_TARJETAS":
            
        colaboracion = [];
        for(let i = 0; i < row.Cantidad; i++) {
            const tarjeta = await prisma.tarjeta_beneficiario.create({
                data: {
                    tarb_colaborador: cola_id
                }
            });
            colaboracion.push(tarjeta);
        }
        break;
    }

    if(!colaboracion) {
        console.error(`Error en la carga de la colaboracion ${String(row)}`);
        throw new Error(`Error en la carga de la colaboracion ${String(row)}`);
    }

    return colaboracion;

}

async function existe(dniTipo: string, dniNro: string): Promise<false|number> {
    
    const persona = await prisma.persona_humana.findFirst({
        where: {
            ph_dni_tipo: dniTipo,
            ph_dni_nro: dniNro
        }
    });

    if(persona) {
        return persona.ph_id;
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
    if(!colaborador) {
        throw new Error("Error en la creación del nuevo colaborador");
    }

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
    if(!persona) {
        throw new Error("Error en la creación de la nueva persona");
    }

    return persona;
}




export async function GET() {
    const colaborador = await crearColaboradorH("sniper12345", "sniper12345");
    const persona = await crearPersonaHumana(colaborador.cola_id, "DNI", "12345678", "Franco", "Tirador", "sniper@gmail.com");

    return NextResponse.json({colaborador: colaborador, persona: persona}, {status:200})

}
