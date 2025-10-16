import prisma from '../config/db.js'
import type {
  IProducto,
  ICreateProductoRequest,
  IUpdateProductoRequest,
} from '../valueObjects/productoVO.js'

export async function getAllProductosService(): Promise<IProducto[]> {
  const productos = await prisma.producto.findMany({
    select: {
      idProducto: true,
      nombreProducto: true,
      idDepartamento_departamento: true,
    },
    orderBy: { idProducto: 'asc' },
  })
  return productos
}

export async function getProductoByIdService(
  id: number
): Promise<IProducto | null> {
  const producto = await prisma.producto.findUnique({
    where: { idProducto: id },
    select: {
      idProducto: true,
      nombreProducto: true,
      idDepartamento_departamento: true,
    },
  })
  return producto
}

export async function createProductoService(
  data: ICreateProductoRequest
): Promise<IProducto> {
  const producto = await prisma.producto.create({
    data: {
      nombreProducto: data.nombreProducto,
      idDepartamento_departamento: data.idDepartamento_departamento,
    },
  })
  return producto
}

export async function updateProductoService(
  id: number,
  data: IUpdateProductoRequest
): Promise<IProducto> {
  const producto = await prisma.producto.update({
    where: { idProducto: id },
    data: {
      nombreProducto: data.nombreProducto,
      idDepartamento_departamento: data.idDepartamento_departamento,
    },
  })
  return producto
}

export async function deleteProductoService(id: number): Promise<void> {
  await prisma.producto.delete({
    where: { idProducto: id },
  })
}
