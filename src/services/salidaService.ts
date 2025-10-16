import prisma from '../config/db.js'
import { Prisma } from '../generated/prisma/index.js'
import type { ISalida, ISalidaResponse } from '../valueObjects/salidaVO.ts'

export async function CrearSalida(data: ISalida): Promise<ISalidaResponse> {
  const {
    idUsuario_usuario,
    idEntradaProducto_entradaProducto,
    idRazon_razon,
    fechaSalida,
    cantidadSalida,
  } = data

  if (!cantidadSalida && cantidadSalida !== 0)
    throw new Error('Debe especificar la cantidadSalida')

  return await prisma.$transaction(async (tx) => {
    const entradaProducto = await tx.entradaProducto.findUnique({
      where: { idEntradaProducto: idEntradaProducto_entradaProducto },
      select: {
        idProducto_producto: true,
        idUnidad_unidad: true,
      },
    })

    if (!entradaProducto) throw new Error('EntradaProducto no encontrada')

    const { idProducto_producto, idUnidad_unidad } = entradaProducto

    const inventario = await tx.inventario.findFirst({
      where: { idProducto_producto, idUnidad_unidad },
    })

    if (!inventario)
      throw new Error('No existe inventario para el producto especificado')

    const cantidadActual = (inventario.cantidadTotal as any)?.toNumber
      ? (inventario.cantidadTotal as any).toNumber()
      : Number(inventario.cantidadTotal)

    if (isNaN(cantidadActual))
      throw new Error('Error interno: cantidadTotal no es numérica')

    if (cantidadActual < cantidadSalida)
      throw new Error('Cantidad insuficiente en inventario')

    const nuevaSalida = await tx.salidaProducto.create({
      data: {
        idUsuario_usuario,
        idEntradaProducto_entradaProducto,
        idRazon_razon,
        fechaSalida: new Date(fechaSalida),
      },
    })

    const nuevaCantidad = cantidadActual - Number(cantidadSalida)

    await tx.inventario.update({
      where: { idInventario: inventario.idInventario },
      data: {
        cantidadTotal: new Prisma.Decimal(nuevaCantidad),
        fechaFinal: new Date(fechaSalida),
      },
    })

    return {
      ...nuevaSalida,
      cantidadSalida,
    }
  })
}

export async function ObtenerSalidas() {
  return await prisma.salidaProducto.findMany({
    include: {
      usuario: {
        select: {
          nombreUsuario: true,
          apellidoPaterno: true,
          apellidoMaterno: true,
        },
      },
      entradaProducto: {
        include: {
          producto: true,
          unidad: true,
        },
      },
      razon: true,
    },
    orderBy: { idSalidaProducto: 'desc' },
  })
}

export async function ObtenerSalidaPorId(idSalida: number) {
  return await prisma.salidaProducto.findUnique({
    where: { idSalidaProducto: idSalida },
    include: {
      usuario: {
        select: {
          nombreUsuario: true,
          apellidoPaterno: true,
          apellidoMaterno: true,
        },
      },
      entradaProducto: {
        include: {
          producto: true,
          unidad: true,
        },
      },
      razon: true,
    },
  })
}
