/* eslint-disable */
import prisma from '../../src/config/db.js'
import {
  CrearSalida,
  ObtenerSalidas,
  ObtenerSalidaPorId,
  ObtenerRazones,
} from '../../src/services/salidaService.ts'

jest.mock('../../src/config/db.js', () => ({
  entradaProducto: { findFirst: jest.fn() },
  salidaProducto: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  inventario: { findFirst: jest.fn(), update: jest.fn() },
  razon: { findMany: jest.fn() },
  $transaction: jest.fn((fn) => fn(prisma)),
}))

describe('Salida Service - Unit Tests', () => {
  afterEach(() => jest.clearAllMocks())

  test('CrearSalida lanza error si no hay productos', async () => {
    await expect(CrearSalida({ salida: {}, productos: [] })).rejects.toThrow(
      'Debes incluir al menos un producto'
    )
  })

  test('CrearSalida crea salida correctamente', async () => {
    prisma.entradaProducto.findFirst.mockResolvedValue({
      idEntradaProducto: 1,
      idUnidad_unidad: 1,
    })
    prisma.inventario.findFirst.mockResolvedValue({
      idInventario: 1,
      cantidadTotal: 10,
    })
    prisma.inventario.update.mockResolvedValue({
      idInventario: 1,
      cantidadTotal: 5,
    })
    prisma.salidaProducto.create.mockResolvedValue({})

    const result = await CrearSalida({
      salida: { idUsuario: 1, idRazon: 1, fechaSalida: new Date() },
      productos: [{ idProducto: 1, cantidad: 5 }],
    })

    expect(result[0].cantidadFinal).toBe(5)
    expect(prisma.salidaProducto.create).toHaveBeenCalled()
  })

  test('ObtenerSalidas retorna lista', async () => {
    prisma.salidaProducto.findMany.mockResolvedValue([{ idSalidaProducto: 1 }])
    const result = await ObtenerSalidas()
    expect(result.length).toBe(1)
  })

  test('ObtenerSalidaPorId retorna una salida', async () => {
    prisma.salidaProducto.findUnique.mockResolvedValue({ idSalidaProducto: 1 })
    const result = await ObtenerSalidaPorId(1)
    expect(result.idSalidaProducto).toBe(1)
  })

  test('ObtenerRazones retorna lista', async () => {
    prisma.razon.findMany.mockResolvedValue([
      { idRazon: 1, razon: 'Merma' },
      { idRazon: 2, razon: 'Donación' },
    ])
    const result = await ObtenerRazones()
    expect(result[0].razon).toBe('Merma')
  })
})
