import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {

    const { 
        cola_usuario,
        cola_contrasena,
        cola_tipo_colaborador,
        pj_razon_social,
        pj_tipo,
        pj_rubro,
        pj_direccion,
        pj_mail
    } = await req.json();
    
    const saltRounds = 10;
    const contrasena_encriptada = await bcrypt.hash(cola_contrasena, saltRounds);

    const nuevoColaborador = await prisma.colaborador.create({
      data: {
        cola_usuario: cola_usuario,
        cola_contrasena: contrasena_encriptada,
        cola_tipo_colaborador: cola_tipo_colaborador
      }
    });

    const pj_id = nuevoColaborador.cola_id
    
    const nuevoPJ = await prisma.persona_juridica.create({
        data: {
            pj_id: pj_id,
            pj_razon_social: pj_razon_social,
            pj_tipo: pj_tipo,
            pj_rubro: pj_rubro,
            pj_direccion: pj_direccion,
            pj_mail: pj_mail
        }
    });

    return NextResponse.json({
        colaborador: nuevoColaborador,
        persona_juridica: nuevoPJ
    }, {status: 201});

  } catch(error) {
    return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
  }
}
