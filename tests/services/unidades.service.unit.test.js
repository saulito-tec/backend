/* eslint-disable */
import prisma from '../../src/config/db.js'
import {
  getAllUnidadesService,
  createUnidadService,
} from '../../src/services/unidadesService.ts'

jest.mock('../../src/config/db.js', () => ({
  unidad: { findMany: jest.fn(), create: jest.fn() },
}))

describe('Unidades Service - Unit Tests', () => {
  afterEach(() => jest.clearAllMocks())

  test('getAllUnidadesService devuelve lista de unidades', async () => {
    prisma.unidad.findMany.mockResolvedValue([{ idUnidad: 1, unidad: 'kg' }])

    const result = await getAllUnidadesService()
    expect(result.length).toBe(1)
    expect(prisma.unidad.findMany).toHaveBeenCalled()
  })

  test('createUnidadService crea una nueva unidad', async () => {
    const mockUnidad = { idUnidad: 2, unidad: 'litro' }
    prisma.unidad.create.mockResolvedValue(mockUnidad)

    const result = await createUnidadService({ unidad: 'litro' })
    expect(result).toEqual(mockUnidad)
    expect(prisma.unidad.create).toHaveBeenCalledWith({
      data: { unidad: 'litro' },
    })
  })
})
