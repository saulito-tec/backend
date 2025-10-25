/* eslint-disable */
import prisma from '../../src/config/db.js'
import {
  getReportesPorAñoService,
  getReportesPorMesService,
  getDetalleEntradaService,
  getDetalleSalidaService,
} from '../../src/services/reportesService.ts'

jest.mock('../../src/config/db.js', () => ({
  entrada: {
    findMany: jest.fn(),
  },
  salidaProducto: {
    findMany: jest.fn(),
  },
}))

describe('Reportes Service - Unit Tests', () => {
  afterEach(() => jest.clearAllMocks())

  test('getReportesPorAñoService combina entradas y salidas correctamente', async () => {
    prisma.entrada.findMany.mockResolvedValue([
      { fechaEntrada: new Date('2025-10-20T00:00:00Z') },
    ])
    prisma.salidaProducto.findMany.mockResolvedValue([
      { fechaSalida: new Date('2025-09-10T00:00:00Z') },
    ])

    const result = await getReportesPorAñoService()
    expect(result.length).toBeGreaterThan(0)
    expect(result[0]).toHaveProperty('year')
  })

  test('getReportesPorMesService combina correctamente los movimientos', async () => {
    prisma.entrada.findMany.mockResolvedValue([
      { idEntrada: 1, fechaEntrada: new Date('2025-10-02T00:00:00Z') },
    ])
    prisma.salidaProducto.findMany.mockResolvedValue([
      { idSalidaProducto: 2, fechaSalida: new Date('2025-10-03T00:00:00Z') },
    ])

    const result = await getReportesPorMesService(2025, 10)
    expect(result.count).toBe(2)
    expect(result.data[0]).toHaveProperty('titulo')
  })

  test('getDetalleEntradaService devuelve datos estructurados', async () => {
    prisma.entrada.findMany.mockResolvedValue([
      {
        fechaEntrada: new Date(),
        usuario: { nombreUsuario: 'Alonso' },
        entradaProducto: [
          {
            cantidad: 5,
            unidad: { unidad: 'pz' },
            producto: {
              nombreProducto: 'Coca-Cola',
              departamento: { nombreDepartamento: 'Bebidas' },
            },
          },
        ],
      },
    ])

    const result = await getDetalleEntradaService({
      year: 2025,
      month: 10,
      day: 25,
    })
    expect(result.usuario.nombreUsuario).toBe('Alonso')
    expect(result.data[0].producto).toBe('Coca-Cola')
  })

  test('getDetalleSalidaService devuelve datos estructurados', async () => {
    prisma.salidaProducto.findMany.mockResolvedValue([
      {
        fechaSalida: new Date(),
        usuario: { nombreUsuario: 'Eliel' },
        razon: { razon: 'Consumo interno' },
        entradaProducto: {
          cantidad: 3,
          unidad: { unidad: 'pz' },
          producto: {
            nombreProducto: 'Cloro',
            departamento: { nombreDepartamento: 'Limpieza' },
          },
        },
      },
    ])

    const result = await getDetalleSalidaService({
      year: 2025,
      month: 10,
      day: 25,
    })
    expect(result.usuario.nombreUsuario).toBe('Eliel')
    expect(result.data[0].razon).toBe('Consumo interno')
  })
})
