/* eslint-disable */
import request from 'supertest'
import app from '../../src/app.js'
import * as entradaService from '../../src/services/entradaService.ts'

jest.mock('../../src/services/entradaService.ts', () => ({
  ObtenerEntradas: jest.fn(),
  ObtenerEntradaPorId: jest.fn(),
  CrearEntrada: jest.fn(),
  getEntradasDeProducto: jest.fn(),
}))

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Entradas Controller - Unit Tests', () => {
  afterEach(() => jest.clearAllMocks())

  test('GET /api/entradas debe devolver lista de entradas', async () => {
    const mockEntradas = [{ idEntrada: 1, emisor: 'Proveedor X' }]
    entradaService.ObtenerEntradas.mockResolvedValue(mockEntradas)

    const res = await request(app).get('/api/entradas').expect(200)
    expect(res.body.success).toBe(true)
    expect(res.body.count).toBe(1)
  })

  test('GET /api/entradas/:id debe devolver una entrada específica', async () => {
    const mockEntrada = { idEntrada: 1, emisor: 'Proveedor Y' }
    entradaService.ObtenerEntradaPorId.mockResolvedValue(mockEntrada)

    const res = await request(app).get('/api/entradas/1').expect(200)
    expect(res.body.data).toEqual(mockEntrada)
  })

  test('GET /api/entradas/:id debe devolver 404 si no se encuentra', async () => {
    entradaService.ObtenerEntradaPorId.mockResolvedValue(null)

    const res = await request(app).get('/api/entradas/999').expect(404)
    expect(res.body.success).toBe(false)
  })

  test('POST /api/entradas crea una nueva entrada', async () => {
    const payload = {
      idUsuario_usuario: 1,
      fechaEntrada: '2025-10-25',
      emisor: 'Proveedor Z',
      compra: 0,
      productos: [
        {
          idProducto: 1,
          idUnidad: 1,
          fechaEstimada: '2025-10-30',
          cantidad: 5,
        },
      ],
    }

    entradaService.CrearEntrada.mockResolvedValue({ idEntrada: 10 })
    const res = await request(app)
      .post('/api/entradas')
      .send(payload)
      .expect(201)

    expect(res.body.success).toBe(true)
    expect(res.body.message).toBe('Entrada creada correctamente')
  })
})
