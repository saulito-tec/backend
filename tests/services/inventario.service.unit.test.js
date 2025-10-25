/* eslint-disable */
import prisma from '../../src/config/db.js'
import {
  getAllInventarioService,
  getInventarioByIdService,
  updateInventarioService,
} from '../../src/services/inventarioService.ts'

jest.mock('../../src/config/db.js', () => ({
  inventario: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}))

describe('Inventario Service - Unit Tests', () => {
  afterEach(() => jest.clearAllMocks())

  test('getAllInventarioService retorna lista', async () => {
    prisma.inventario.findMany.mockResolvedValue([
      { idInventario: 1, cantidadTotal: '100.000' },
    ])

    const result = await getAllInventarioService()
    expect(result).toHaveLength(1)
    expect(typeof result[0].cantidadTotal).toBe('number')
  })

  test('getInventarioByIdService retorna un registro', async () => {
    prisma.inventario.findUnique.mockResolvedValue({
      idInventario: 1,
      cantidadTotal: '200.000',
    })
    const result = await getInventarioByIdService(1)
    expect(result.idInventario).toBe(1)
  })

  test('getInventarioByIdService retorna null si no existe', async () => {
    prisma.inventario.findUnique.mockResolvedValue(null)
    const result = await getInventarioByIdService(999)
    expect(result).toBeNull()
  })

  test('updateInventarioService actualiza registro', async () => {
    prisma.inventario.update.mockResolvedValue({
      idInventario: 1,
      cantidadTotal: '300.000',
    })

    const result = await updateInventarioService(1, {
      idProducto_producto: 2,
      cantidadTotal: 300,
      idUnidad_unidad: 1,
      fechaFinal: new Date('2025-10-30'),
    })

    expect(result.cantidadTotal).toBe(300)
    expect(prisma.inventario.update).toHaveBeenCalled()
  })
})
