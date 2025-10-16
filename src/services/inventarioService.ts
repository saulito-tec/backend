import prisma from '../config/db.js'
import type {
  IInventario,
  IInventarioUpdateRequest,
} from '../valueObjects/inventarioVOs.js'

export async function getAllInventarioService(): Promise<IInventario[]> {
  const inventario = await prisma.inventario.findMany({
    select: {
      idInventario: true,
      idProducto_producto: true,
      cantidadTotal: true,
      idUnidad_unidad: true,
      fechaFinal: true,
    },
    orderBy: { idInventario: 'asc' },
  })
  return inventario.map((i) => ({
    ...i,
    cantidadTotal: Number(i.cantidadTotal),
  }))
}

export async function getInventarioByIdService(
  id: number
): Promise<IInventario | null> {
  const inventario = await prisma.inventario.findUnique({
    where: { idInventario: id },
    select: {
      idInventario: true,
      idProducto_producto: true,
      cantidadTotal: true,
      idUnidad_unidad: true,
      fechaFinal: true,
    },
  })

  return inventario
    ? { ...inventario, cantidadTotal: Number(inventario.cantidadTotal) }
    : null
}

export async function updateInventarioService(
  id: number,
  data: IInventarioUpdateRequest
): Promise<IInventario> {
  const updated = await prisma.inventario.update({
    where: { idInventario: id },
    data: {
      idProducto_producto: data.idProducto_producto,
      cantidadTotal: data.cantidadTotal,
      idUnidad_unidad: data.idUnidad_unidad,
      fechaFinal: new Date(data.fechaFinal),
    },
  })

  return { ...updated, cantidadTotal: Number(updated.cantidadTotal) }
}
