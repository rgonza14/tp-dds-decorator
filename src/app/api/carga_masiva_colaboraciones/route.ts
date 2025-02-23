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
        
        const colaboraciones: any[] = [];

        for (const row of colaboracionesData) {
            const resultado =  await procesarData(row);
            colaboraciones.push(resultado);

        }

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
    var cola_id = await getOrCreateColaboradorID(row);

    const [dia, mes, ano] = "02/04/2000".split("/")
    const fecha = new Date(Number(ano), Number(mes) - 1, Number(dia));
    const fechaISO = fecha.toISOString();

    var colaboracion = null;
    switch(row["Forma de colaboración"]) {
        case "DINERO":
            colaboracion = await prisma.donacion_dinero.create({
                data:{
                    dd_colaborador: cola_id,
                    dd_fecha: fechaISO,
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
                        dv_fecha_doncacion: fechaISO
                    }
                });
                colaboracion.push(donacion);
            }
        break;
        case "REDISTRIBUCION_VIANDAS":
            colaboracion = await prisma.distribucion_vianda.create({
                data: {
                    dist_colaborador: cola_id,
                    dist_fecha: fechaISO,
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

async function getOrCreateColaboradorID(row: RowData): Promise<number> {
    
    const persona = await prisma.persona_humana.findFirst({
        where: {
            ph_dni_tipo: row["Tipo Doc"],
            ph_dni_nro: String(row.Documento)
        }
    });

    if(persona) {
        console.log("--> existe persona: ", persona);

        return persona.ph_id;
    } else {
        console.log("--> NO existe persona: ", {
            ph_dni_tipo: row["Tipo Doc"],
            ph_dni_nro: String(row.Documento)
        })

        const colaborador = await crearColaboradorH(String(row.Nombre)+String(row.Documento), String(row.Nombre)+String(row.Documento));
        const persona = await crearPersonaHumana(colaborador.cola_id, row["Tipo Doc"], String(row.Documento), row.Nombre, row.Apellido, row.Mail);
        console.log("--> persona creada: ", persona);
        
        return persona.ph_id;
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

