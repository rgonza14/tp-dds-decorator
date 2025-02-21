import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { throwDeprecation } from "process";

const prisma = new PrismaClient();

export async function GET(req: Request) {

    try {
        const {searchParams} = new URL(req.url);
        const cola_id = Number(searchParams.get("cola_id"));

        if(!cola_id) {
            return NextResponse.json({message: "Se requiere id del colaborador"}, {status:400});
        }

        // Obtener donaciones dinero
        const donaciones_dinero = await prisma.donacion_dinero.findMany({
            where: {dd_colaborador: cola_id}
        });
        const coef_dd = await getCoeficiente("PESOS_DONADOS");
        const pesos_donados = donaciones_dinero.reduce((pesos,donacion_dinero) => {
            switch(donacion_dinero.dd_frecuencia) {
                case "una vez":
                    return pesos + Number(donacion_dinero.dd_monto);
                break;
                case "semanal":
                    return pesos + semanas(donacion_dinero.dd_fecha??new Date(), new Date()) * Number(donacion_dinero.dd_monto)
                    ;
                break;
                case "mensual":
                    return pesos + meses(donacion_dinero.dd_fecha??new Date(), new Date()) * Number(donacion_dinero.dd_monto)
                break;
                default:
                    return pesos
                break;
            }
        }, 0);

        // Obtener viandas distribuidas
        const distribuciones = await prisma.distribucion_vianda.findMany({
            where: {dist_colaborador: cola_id}
        });
        const coef_dist = await getCoeficiente("VIANDAS_DISTRIBUIDAS");
        const viandas_distribuidas = distribuciones.reduce((viandas, distribucion) => {
            return viandas + Number(distribucion.dist_cantidad);
        }, 0);

        // Obtener donaciones viandas
        const donaciones_vianda = await prisma.donacion_vianda.findMany({
            where: {dv_colaborador: cola_id}
        });
        const coef_dv = await getCoeficiente("VIANDAS_DONADAS");
        const viandas_donadas = donaciones_vianda.length;

        // obtener tarjetas repartidas
        const tarjetas = await prisma.tarjeta_beneficiario.findMany({
            where: {tarb_colaborador: cola_id}
        });
        const coef_tarb = await getCoeficiente("TARJETAS_REPARTIDAS");
        const tarjetas_repartidas = tarjetas.length;

        // obtener heladeras
        const heladeras = await prisma.heladera.findMany({
            where: {hela_colaborador: cola_id}
        });
        const coef_hela = await getCoeficiente("ACTIVIDAD_HELADERAS");
        const actividad_heladeras = heladeras.reduce((meses_activa, heladera) => {
            return meses(heladera.hela_fecha_registro??new Date(), new Date());
        }, 0);

        const puntos = Number(coef_dd) * pesos_donados +
        Number(coef_dist) * viandas_distribuidas +
        Number(coef_dv) * viandas_donadas + 
        Number(coef_tarb) * tarjetas_repartidas +
        Number(coef_hela) * actividad_heladeras;

        return NextResponse.json({puntos: puntos}, {status: 200})

    } catch(error) {
        console.log("-> ERROR en GET")
        console.error(error)
        return NextResponse.json({message: "Error en el servidor", error}, {status: 500});
    }

}

async function getCoeficiente(descripcion: string) {
    try{
        const coeficiente = await prisma.coeficiente_reconocimiento.findUnique({
            where: {coef_descripcion: descripcion}
        });
        return (coeficiente?.coef_coeficiente)
    } catch(error) {
        console.log("-> ERROR en getCoeficiente")
        console.error(error)
        throw error;
    }
}

function meses(fechaDesde: Date, fechaHasta: Date): number {
    return (fechaHasta.getFullYear() - fechaDesde.getFullYear()) * 12 + (fechaHasta.getMonth() - fechaDesde.getMonth());
}

function semanas(fechaDesde: Date, fechaHasta: Date): number {
    return (fechaHasta.getFullYear() - fechaDesde.getFullYear()) * 12 * 4 + (fechaHasta.getMonth() - fechaDesde.getMonth()) * 4 + Math.floor((fechaHasta.getDay() - fechaDesde.getDay()) / 7);
}
