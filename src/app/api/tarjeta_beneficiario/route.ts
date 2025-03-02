import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(req: Request) {

    try {
        const {tarjeta_nro, fecha, cola_id, psv_id} = await req.json();
        if(!tarjeta_nro) {
            return NextResponse.json({message: "datos insuficientes"},{status: 400});
        }
        
        const tarb_fecha_alta = fecha ?? (new Date()).toISOString();
        
        const nuevaTarjeta = await prisma.tarjeta_beneficiario.create({
            data: {
                tarb_nro: String(tarjeta_nro),
                tarb_fecha_alta: Number(psv_id)?tarb_fecha_alta:null,
                tarb_colaborador: Number(cola_id)?Number(cola_id):null,
                tarb_beneficiario: Number(psv_id)?Number(psv_id):null
            }
        });

        if(!nuevaTarjeta) {
            return NextResponse.json({message: "Error en la creacion de la tarjeta"}, {status: 404});
        }

        return NextResponse.json({
            tarjeta: nuevaTarjeta,
            message: "Tarjeta registrada exitosamente"
        }, {status: 201});


    } catch(error) {
        console.log(error);
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }

}

export async function PUT(req: Request) {

    try {
        const {tarjeta_nro, fecha, cola_id, psv_id, tarb_id} = await req.json();
        console.log("--> OUT: ",{
            tarjeta_nro: tarjeta_nro,
            fecha: fecha,
            cola_id: cola_id,
            psv_id: psv_id,
            tarb_id: tarb_id
        })
        if((!tarjeta_nro&&!tarb_id) || !cola_id || !psv_id) {
            return NextResponse.json({message: "Datos insuficientes"},{status: 400});
        }

        const tarb_fecha_alta = fecha ?? (new Date()).toISOString().split("T")[0];

        const tarjetaActualizada = await prisma.tarjeta_beneficiario.update({
            where: tarb_id ? {tarb_id: tarb_id} : {tarb_nro: tarjeta_nro},
            data: {
                tarb_colaborador: Number(cola_id),
                tarb_fecha_alta: tarb_fecha_alta,
                tarb_beneficiario: Number(psv_id)
            }
        });

        if(!tarjetaActualizada) {
            return NextResponse.json({message: "Tarjeta no encontrada"}, {status: 404});
        }

        return NextResponse.json({
            tarjeta: tarjetaActualizada,
            message: "Tarjeta actualizada exitosamente"
        }, {status: 201});

    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }

}

export async function GET(req: Request) {

    try {
        const {searchParams} = new URL(req.url);
        const tarb_id = searchParams.get("tarb_id");
        const tarb_nro = searchParams.get("tarb_nro");
        const psv_id = searchParams.get("psv_id");

        if(tarb_id) {
            const tarjeta = await prisma.tarjeta_beneficiario.findUnique({
                where: {tarb_id: Number(tarb_id)}
            });
            if(!tarjeta) {
                return NextResponse.json({message: "Tarjeta no encontrada"}, {status: 404});
            }
            return NextResponse.json({
                tarjeta: tarjeta,
            },{status: 200});
        }
        
        if(tarb_nro) {
            const tarjeta = await prisma.tarjeta_beneficiario.findUnique({
                where: {tarb_nro: tarb_nro}
            });
            if(!tarjeta) {
                return NextResponse.json({message: "Tarjeta no encontrada"}, {status: 404});
            }
            return NextResponse.json({
                tarjeta: tarjeta,
            },{status: 200});
        }
        
        if(psv_id) {
            const tarjeta = await prisma.tarjeta_beneficiario.findFirst({
                where: {tarb_beneficiario: Number(psv_id)}
            });
            if(!tarjeta) {
                return NextResponse.json({message: "Tarjeta no encontrada"}, {status: 404});
            }
            return NextResponse.json({
                tarjeta: tarjeta,
            },{status: 200});
        }

        const tarjetas = await prisma.tarjeta_beneficiario.findMany();
        if(!tarjetas) {
            return NextResponse.json({message: "Tarjeta no encontrada"}, {status: 404});
        }
        return NextResponse.json({
            tarjetas: tarjetas,
        },{status: 200});
        
    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }

}