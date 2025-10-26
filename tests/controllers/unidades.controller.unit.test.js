/* eslint-disable */
import request from 'supertest'
import app from '../../src/app.js'
import * as unidadesService from '../../src/services/unidadesService.ts'

jest.mock('../../src/services/unidadesService.ts', () => ({
  getAllUnidadesService: jest.fn(),
  createUnidadService: jest.fn(),
}))

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Unidades Controller - Unit Tests', () => {
  afterEach(() => jest.clearAllMocks())

  test('GET /api/unidades devuelve lista de unidades', async () => {
    const mockUnidades = [{ idUnidad: 1, unidad: 'kg' }]
    unidadesService.getAllUnidadesService.mockResolvedValue(mockUnidades)

    const res = await request(app).get('/api/unidades').expect(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data).toEqual(mockUnidades)
  })

  test('GET /api/unidades devuelve 500 si falla el servicio', async () => {
    unidadesService.getAllUnidadesService.mockRejectedValue(
      new Error('DB error')
    )

    const res = await request(app).get('/api/unidades').expect(500)
    expect(res.body.message).toMatch(/Error al obtener unidades/)
  })

  test('POST /api/unidades crea una nueva unidad', async () => {
    const mockUnidad = { idUnidad: 2, unidad: 'litro' }
    unidadesService.createUnidadService.mockResolvedValue(mockUnidad)

    const res = await request(app)
      .post('/api/unidades')
      .send({ unidad: 'litro' })
      .expect(201)

    expect(res.body.success).toBe(true)
    expect(res.body.data).toEqual(mockUnidad)
  })

  test('POST /api/unidades devuelve 400 si falta el campo unidad', async () => {
    const res = await request(app).post('/api/unidades').send({}).expect(400)
    expect(res.body.message).toMatch(/obligatorio/)
  })

  test('POST /api/unidades devuelve 500 si ocurre error interno', async () => {
    unidadesService.createUnidadService.mockRejectedValue(new Error('Error DB'))
    const res = await request(app)
      .post('/api/unidades')
      .send({ unidad: 'gramo' })
      .expect(500)
    expect(res.body.message).toMatch(/Error al crear unidad/)
  })
})
