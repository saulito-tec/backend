import prisma from '../config/db.js'
import type { ISalida, ISalidaProducto } from '../valueObjects/salidaVO.ts'
import type { IRazonSalida } from '../valueObjects/razonVO.js'

interface CrearSalidaProps {
  salida: ISalida
  productos: ISalidaProducto[]
}

export async function CrearSalida({ salida, productos }: CrearSalidaProps) {
  if (!productos || productos.length === 0) {
    throw new Error('Debes incluir al menos un producto en la salida')
  }

  return await prisma.$transaction(async (tx) => {
    const resultados = [] as any

    for (const producto of productos) {
      const ultimaEntrada = await tx.entradaProducto.findFirst({
        where: { idProducto_producto: producto.idProducto },
        orderBy: { idEntradaProducto: 'desc' },
      })

      if (!ultimaEntrada) {
        throw new Error(
          `No se encontró una entrada previa para el producto con id ${producto.idProducto}`
        )
      }

      await tx.salidaProducto.create({
        data: {
          idUsuario_usuario: salida.idUsuario,
          idEntradaProducto_entradaProducto: ultimaEntrada.idEntradaProducto,
          idRazon_razon: salida.idRazon,
          fechaSalida: salida.fechaSalida,
        },
      })

      const inventario = await tx.inventario.findFirst({
        where: {
          idProducto_producto: producto.idProducto,
          idUnidad_unidad: ultimaEntrada.idUnidad_unidad,
        },
      })

      if (!inventario) {
        throw new Error(
          `No existe inventario registrado para el producto con id ${producto.idProducto}`
        )
      }

      const cantidadFinal =
        Number(inventario.cantidadTotal) - Number(producto.cantidad)

      if (cantidadFinal < 0) {
        throw new Error(
          `Cantidad insuficiente en inventario para el producto con id ${producto.idProducto}`
        )
      }

      const inventarioActualizado = await tx.inventario.update({
        where: { idInventario: inventario.idInventario },
        data: {
          cantidadTotal: cantidadFinal,
          fechaFinal: salida.fechaSalida,
        },
      })

      resultados.push({
        idProducto: producto.idProducto,
        cantidadFinal: Number(inventarioActualizado.cantidadTotal),
      })
    }

    return resultados
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

export async function ObtenerRazones(): Promise<IRazonSalida[]> {
  const razones = await prisma.razon.findMany({
    select: {
      idRazon: true,
      razon: true,
    },
    orderBy: { idRazon: 'asc' },
  })

  return razones.map((r) => ({
    idRazon: r.idRazon,
    razon: r.razon,
  }))
}
