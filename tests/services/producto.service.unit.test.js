/* eslint-disable */
import prisma from '../../src/config/db.js'
import {
  getAllProductosService,
  getProductoByIdService,
  createProductoService,
  updateProductoService,
  deleteProductoService,
  getAllCategoriesService,
} from '../../src/services/productoService.ts'

jest.mock('../../src/config/db.js', () => ({
  producto: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  departamento: {
    findMany: jest.fn(),
  },
  inventario: {
    create: jest.fn(),
  },
  $transaction: jest.fn((fn) => fn(prisma)),
}))

describe('Producto Service - Unit Tests', () => {
  afterEach(() => jest.clearAllMocks())

  test('getAllProductosService devuelve lista', async () => {
    prisma.producto.findMany.mockResolvedValue([
      { idProducto: 1, nombreProducto: 'Detergente' },
    ])
    const result = await getAllProductosService()
    expect(result).toHaveLength(1)
  })

  test('getProductoByIdService devuelve un producto', async () => {
    prisma.producto.findUnique.mockResolvedValue({
      idProducto: 1,
      nombreProducto: 'Pinol',
    })
    const result = await getProductoByIdService(1)
    expect(result.idProducto).toBe(1)
  })

  test('createProductoService crea producto y registro en inventario', async () => {
    prisma.producto.create.mockResolvedValue({
      idProducto: 1,
      nombreProducto: 'Nuevo',
    })
    prisma.inventario.create.mockResolvedValue({})

    const result = await createProductoService({
      nombreProducto: 'Nuevo',
      idDepartamento_departamento: 1,
      idUnidad_unidad: 2,
    })

    expect(result.idProducto).toBe(1)
    expect(prisma.inventario.create).toHaveBeenCalled()
  })

  test('updateProductoService actualiza un producto', async () => {
    prisma.producto.update.mockResolvedValue({
      idProducto: 1,
      nombreProducto: 'Editado',
    })

    const result = await updateProductoService(1, {
      nombreProducto: 'Editado',
      idDepartamento_departamento: 1,
      emoji: '🧴',
    })
    expect(result.nombreProducto).toBe('Editado')
  })

  test('deleteProductoService elimina producto', async () => {
    prisma.producto.delete.mockResolvedValue({})
    await deleteProductoService(1)
    expect(prisma.producto.delete).toHaveBeenCalledWith({
      where: { idProducto: 1 },
    })
  })

  test('getAllCategoriesService obtiene lista de categorías', async () => {
    prisma.departamento.findMany.mockResolvedValue([
      { idDepartamento: 1, nombreDepartamento: 'Limpieza' },
    ])
    const result = await getAllCategoriesService()
    expect(result[0].nombreDepartamento).toBe('Limpieza')
  })
})
