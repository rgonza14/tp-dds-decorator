import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

const prisma = new PrismaClient();


export async function POST(req: Request) {
    try {
        const {psv_id, dv_id} = await req.json();

        if(!psv_id || ! dv_id) {
            return NextResponse.json({message: "ID vianda y ID persona son requeridos"},{status: 400});
        }

        const nuevaExtraccion = await prisma.extraccion_vianda.create({
                data: {
                    extr_vianda: dv_id,
                    extr_beneficiario: psv_id
                }
            }
        );

        if(!nuevaExtraccion) {
            return NextResponse.json({message: "Error en la extraccion"}, {status: 404});
        }

        return NextResponse.json({
            extraccion: nuevaExtraccion,
            message: "extraccion exitosa"
        }, {status: 201});

    } catch(error) {
        console.log(error);
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }

}

export async function GET(req: Request) {

    try {
        const {searchParams} = new URL(req.url);
        const psv_id = searchParams.get("psv_id");
        const fechaDesde = searchParams.get("fechaDesde");
        const fechaHasta = searchParams.get("fechaHasta");

        if(!psv_id) {
            const extraccionesTodas = await prisma.extraccion_vianda.findMany();
            if(!extraccionesTodas) {
                return NextResponse.json({message: "Error en la base de datos"}, {status: 404});
            }
            return NextResponse.json({
                extracciones: extraccionesTodas
            }, {status: 200});
        }

        if(!fechaDesde || !fechaHasta) {
            const extraccionesBeneficiario = await prisma.extraccion_vianda.findMany({
                where: {
                    extr_beneficiario: Number(psv_id),
                }
            });
            if(!extraccionesBeneficiario) {
                return NextResponse.json({message: "Error en la base de datos"}, {status: 404});
            }
            return NextResponse.json({
                extracciones: extraccionesBeneficiario,
            }, {status: 200});
        }
        
        const extracciones = await prisma.extraccion_vianda.findMany({
            where: {
                extr_beneficiario: Number(psv_id),
                extr_fecha: {
                    gte: new Date(String(fechaDesde)).toISOString(),
                    lte: new Date(String(fechaHasta)).toISOString()
                }
            }
        });
        if(!extracciones) {
            return NextResponse.json({message: "Error en la base de datos"}, {status: 404});
        }
        return NextResponse.json({
            extracciones: extracciones
        }, {status: 200});



    } catch(error) {
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }

}