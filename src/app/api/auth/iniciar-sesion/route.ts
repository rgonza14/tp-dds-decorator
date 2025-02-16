import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {

    try {

        const {
            cola_usuario,
            cola_contrasena,
        } = await req.json();
        
        // corrobar recepcion de datos
        if (!cola_usuario || !cola_contrasena) {
            return NextResponse.json({message: "Usuario y contraseña son requeridos"}, {status: 400});
        }
        
        // buscar usuario en la base de datos
        const colaborador = await prisma.colaborador.findUnique({
            where: {cola_usuario: cola_usuario}
        });

        // si no existe ese usuario, retornar
        if(!colaborador) {
            return NextResponse.json({message: "No se encontró el colaborador"}, {status:404});
        }

        // comparar contraseñas
        const contrasenaCoincide = await bcrypt.compare(cola_contrasena, colaborador.cola_contrasena||"");

        // retornar si no coincide la contraseña
        if(!contrasenaCoincide) {
            return NextResponse.json({message: "Credenciales incorrectas"}, {status: 401})
        }

        // buscar persona asociada al colaborador(usuario) humana o juridica
        var body = null;
        switch(colaborador.cola_tipo_colaborador) {
            case "persona_juridica":
                const pj = await prisma.persona_juridica.findUnique({
                    where: {pj_id: colaborador.cola_id}
                });
                if(!pj) {
                    return NextResponse.json({message: "No se encontró la persona juridica asociada al colaborador"}, {status:404});
                }
                body = {colaborador: colaborador, persona: pj};
            break;

            case "persona_humana":
                const ph = await prisma.persona_humana.findUnique({
                    where: {ph_id: colaborador.cola_id}
                });
                if(!ph) {
                    return NextResponse.json({message: "No se encontró la persona humana asociada al colaborador"}, {status:404});
                }
                body = {colaborador: colaborador, persona: ph};
            break;

            default:
                body = {colaborador};
            break;
        }


        return NextResponse.json(body, {status: 200});

    } catch(error: any){
        console.error("Error en el servidor:", error);
        return NextResponse.json({message: "Error en el servidor", error: error.message}, {status: 500})
    }

}