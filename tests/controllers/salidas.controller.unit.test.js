/* eslint-disable */
import request from 'supertest'
import app from '../../src/app.js'
import * as salidaService from '../../src/services/salidaService.ts'

jest.mock('../../src/services/salidaService.ts', () => ({
  CrearSalida: jest.fn(),
  ObtenerSalidas: jest.fn(),
  ObtenerSalidaPorId: jest.fn(),
  ObtenerRazones: jest.fn(),
}))

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Salidas Controller - Unit Tests', () => {
  afterEach(() => jest.clearAllMocks())

  test('GET /api/salidas devuelve lista de salidas', async () => {
    const mockSalidas = [{ idSalidaProducto: 1 }]
    salidaService.ObtenerSalidas.mockResolvedValue(mockSalidas)

    const res = await request(app).get('/api/salidas').expect(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data).toEqual(mockSalidas)
  })

  test('GET /api/salidas/:id devuelve una salida', async () => {
    const mockSalida = { idSalidaProducto: 1 }
    salidaService.ObtenerSalidaPorId.mockResolvedValue(mockSalida)

    const res = await request(app).get('/api/salidas/1').expect(200)
    expect(res.body.data).toEqual(mockSalida)
  })

  test('GET /api/salidas/:id devuelve 404 si no existe', async () => {
    salidaService.ObtenerSalidaPorId.mockResolvedValue(null)
    const res = await request(app).get('/api/salidas/999').expect(404)
    expect(res.body.message).toBe('Salida no encontrada')
  })

  test('POST /api/salidas crea una salida correctamente', async () => {
    const mockResult = [{ idProducto: 1, cantidadFinal: 10 }]
    salidaService.CrearSalida.mockResolvedValue(mockResult)

    const payload = {
      idUsuario: 1,
      idRazon: 2,
      fechaSalida: '2025-10-30',
      productos: [{ idProducto: 1, cantidad: 5 }],
    }

    const res = await request(app)
      .post('/api/salidas')
      .send(payload)
      .expect(201)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toBe('Salida creada correctamente')
  })

  test('POST /api/salidas devuelve 400 si faltan campos', async () => {
    const res = await request(app).post('/api/salidas').send({}).expect(400)
    expect(res.body.message).toMatch(/Faltan campos obligatorios/)
  })

  test('GET /api/salidas/razones devuelve lista de razones', async () => {
    const mockRazones = [{ idRazon: 1, razon: 'Merma' }]
    salidaService.ObtenerRazones.mockResolvedValue(mockRazones)

    const res = await request(app).get('/api/salidas/razones').expect(200)
    expect(res.body.data).toEqual(mockRazones)
  })
})
