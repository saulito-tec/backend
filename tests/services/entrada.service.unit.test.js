/* eslint-disable */
import prisma from '../../src/config/db.js'
import {
  CrearEntrada,
  ObtenerEntradas,
  ObtenerEntradaPorId,
  getEntradasDeProducto,
} from '../../src/services/entradaService.ts'

jest.mock('../../src/config/db.js', () => ({
  entrada: { findMany: jest.fn(), findUnique: jest.fn(), create: jest.fn() },
  entradaProducto: { findMany: jest.fn(), create: jest.fn() },
  inventario: { findFirst: jest.fn(), update: jest.fn(), create: jest.fn() },
  $transaction: jest.fn((fn) =>
    fn({
      entrada: {
        create: prisma.entrada.create,
      },
      entradaProducto: prisma.entradaProducto,
      inventario: prisma.inventario,
    })
  ),
}))

describe('Entrada Service Unit Tests', () => {
  afterEach(() => jest.clearAllMocks())

  test('ObtenerEntradas retorna array', async () => {
    prisma.entrada.findMany.mockResolvedValue([{ idEntrada: 1 }])
    const result = await ObtenerEntradas()
    expect(result).toHaveLength(1)
  })

  test('ObtenerEntradaPorId retorna una entrada', async () => {
    prisma.entrada.findUnique.mockResolvedValue({ idEntrada: 5 })
    const result = await ObtenerEntradaPorId(5)
    expect(result.idEntrada).toBe(5)
  })

  test('CrearEntrada ejecuta transacción y retorna nueva entrada', async () => {
    prisma.entrada.create.mockResolvedValue({ idEntrada: 99 })
    prisma.inventario.findFirst.mockResolvedValue(null)
    prisma.inventario.create.mockResolvedValue({})

    const result = await CrearEntrada({
      entrada: {
        idUsuario: 1,
        fechaEntrada: new Date(),
        emisor: 'Proveedor Test',
        compra: 1,
      },
      productos: [
        {
          idEntrada: 0,
          idProducto: 1,
          idUnidad: 1,
          fechaEstimada: new Date(),
          cantidad: 5,
        },
      ],
    })

    expect(result.idEntrada).toBe(99)
    expect(prisma.entrada.create).toHaveBeenCalled()
  })

  test('getEntradasDeProducto retorna lista', async () => {
    prisma.entradaProducto.findMany.mockResolvedValue([
      { idEntradaProducto: 1 },
    ])
    const result = await getEntradasDeProducto(1, 5)
    expect(result[0].idEntradaProducto).toBe(1)
  })
})
