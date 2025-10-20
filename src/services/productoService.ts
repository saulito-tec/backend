import prisma from '../config/db.js'
import type {
  IProducto,
  ICreateProductoRequest,
  IUpdateProductoRequest,
  IDepartamento,
} from '../valueObjects/productoVO.js'

export async function getAllProductosService(): Promise<IProducto[]> {
  const productos = await prisma.producto.findMany({
    select: {
      idProducto: true,
      nombreProducto: true,
      emoji: true,
      idDepartamento_departamento: true,
      departamento: {
        select: {
          idDepartamento: true,
          nombreDepartamento: true,
        },
      },
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
      emoji: true,
      idDepartamento_departamento: true,
      departamento: {
        select: {
          idDepartamento: true,
          nombreDepartamento: true,
        },
      },
    },
  })
  return producto
}

export async function createProductoService(
  data: ICreateProductoRequest
): Promise<IProducto> {
  return await prisma.$transaction(async (tx) => {
    const producto = await tx.producto.create({
      data: {
        nombreProducto: data.nombreProducto,
        idDepartamento_departamento: data.idDepartamento_departamento,
        emoji: data.emoji || '📦',
      },
      select: {
        idProducto: true,
        nombreProducto: true,
        idDepartamento_departamento: true,
        emoji: true,
        departamento: {
          select: {
            idDepartamento: true,
            nombreDepartamento: true,
          },
        },
      },
    })

    console.log('PRODUCTO: ', producto)
    await tx.inventario.create({
      data: {
        idProducto_producto: producto.idProducto,
        cantidadTotal: 0,
        idUnidad_unidad: data.idUnidad_unidad ?? 5,
        fechaFinal: new Date(),
      },
    })

    return producto
  })
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
      emoji: data.emoji,
    },
    select: {
      idProducto: true,
      nombreProducto: true,
      idDepartamento_departamento: true,
      emoji: true,
      departamento: {
        select: {
          idDepartamento: true,
          nombreDepartamento: true,
        },
      },
    },
  })
  return producto
}

export async function deleteProductoService(id: number): Promise<void> {
  await prisma.producto.delete({
    where: { idProducto: id },
  })
}

export async function getAllCategoriesService(): Promise<IDepartamento[]> {
  try {
    const departamentos = await prisma.departamento.findMany()
    console.log(departamentos)
    return departamentos
  } catch (error) {
    console.error('Error al obtener los departamentos:', error)
    throw new Error('No se pudieron obtener los departamentos')
  }
}
