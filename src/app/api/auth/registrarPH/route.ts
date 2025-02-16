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
        ph_nombre,
        ph_apellido,
        ph_telefono,
        ph_mail,
        ph_fecha_nacimiento,
        ph_direccion
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

    const ph_id = nuevoColaborador.cola_id;

    const nuevoPH = await prisma.persona_humana.create({
        data: {
            ph_id: ph_id,
            ph_nombre: ph_nombre,
            ph_apellido: ph_apellido,
            ph_telefono: ph_telefono,
            ph_mail: ph_mail,
            ph_fecha_nacimiento: ph_fecha_nacimiento,
            ph_direccion: ph_direccion
        }
    });


    return NextResponse.json({
        colaborador: nuevoColaborador,
        persona: nuevoPH
    }, {status: 201});

  } catch(error) {
    return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
  }
}


async function getPersona(colaborador: any) {


  switch(colaborador.cola_tipo_colaborador) {
      case "persona_juridica":
          const pj = await prisma.persona_juridica.findUnique({
              where: {pj_id: colaborador.cola_id}
          })
          return pj;
      break;
      case "persona_humana":
          const ph = await prisma.persona_humana.findUnique({
              where: {ph_id: colaborador.cola_id}
          });
          return ph;
      break;
      default:
          return null;
      break;
  }

}