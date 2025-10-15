import prisma from '../config/db.js'
import type { IEntrada, IEntradaProducto } from '../valueObjects/entradaVOs'

interface CrearEntradaProps {
  entrada: IEntrada
  productos: IEntradaProducto[]
}

export async function CrearEntrada({ entrada, productos }: CrearEntradaProps) {
  try {
    return await prisma.$transaction(async (tx) => {
      const nuevaEntrada = await tx.entrada.create({
        data: {
          idUsuario_usuario: entrada.idUsuario,
          fechaEntrada: new Date(entrada.fechaEntrada),
          emisor: entrada.emisor,
          compra: entrada.compra,
        },
      })

      for (const producto of productos) {
        await tx.entradaProducto.create({
          data: {
            idEntrada_entrada: nuevaEntrada.idEntrada,
            idProducto_producto: producto.idProducto,
            idUnidad_unidad: producto.idUnidad,
            fechaEstimada: new Date(producto.fechaEstimada),
            cantidad: producto.cantidad,
          },
        })

        const inventarioExistente = await tx.inventario.findFirst({
          where: {
            idProducto_producto: producto.idProducto,
            idUnidad_unidad: producto.idUnidad,
          },
        })

        if (inventarioExistente) {
          await tx.inventario.update({
            where: { idInventario: inventarioExistente.idInventario },
            data: {
              cantidadTotal:
                Number(inventarioExistente.cantidadTotal) + producto.cantidad,
              fechaFinal: new Date(producto.fechaEstimada),
            },
          })
        } else {
          await tx.inventario.create({
            data: {
              idProducto_producto: producto.idProducto,
              idUnidad_unidad: producto.idUnidad,
              cantidadTotal: producto.cantidad,
              fechaFinal: new Date(producto.fechaEstimada),
            },
          })
        }
      }

      return nuevaEntrada
    })
  } catch (e) {
    console.error('Ocurrió un error al crear la entrada:', e)
    throw e
  }
}

export async function ObtenerEntradas() {
  return await prisma.entrada.findMany({
    include: {
      entradaProducto: {
        include: {
          producto: true,
          unidad: true,
        },
      },
      usuario: {
        select: {
          nombreUsuario: true,
          apellidoPaterno: true,
          apellidoMaterno: true,
        },
      },
    },
    orderBy: { idEntrada: 'desc' },
  })
}

export async function ObtenerEntradaPorId(idEntrada: number) {
  return await prisma.entrada.findUnique({
    where: { idEntrada },
    include: {
      entradaProducto: {
        include: {
          producto: true,
          unidad: true,
        },
      },
      usuario: {
        select: {
          nombreUsuario: true,
          apellidoPaterno: true,
          apellidoMaterno: true,
        },
      },
    },
  })
}
