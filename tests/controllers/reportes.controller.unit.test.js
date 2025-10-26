/* eslint-disable */
import request from 'supertest'
import app from '../../src/app.js'
import * as reportesService from '../../src/services/reportesService.ts'

jest.mock('../../src/services/reportesService.ts', () => ({
  getReportesPorAñoService: jest.fn(),
  getReportesPorMesService: jest.fn(),
  getDetalleEntradaService: jest.fn(),
  getDetalleSalidaService: jest.fn(),
}))

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Reportes Controller - Unit Tests', () => {
  afterEach(() => jest.clearAllMocks())

  test('GET /api/reportes debe devolver los años', async () => {
    const mockData = [{ year: 2025, months: ['octubre', 'septiembre'] }]
    reportesService.getReportesPorAñoService.mockResolvedValue(mockData)

    const res = await request(app).get('/api/reportes').expect(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data).toEqual(mockData)
  })

  test('GET /api/reportes/:year/:month devuelve datos mensuales', async () => {
    const mockResult = {
      count: 2,
      data: [{ tipo: 'entrada', titulo: 'Entrada X' }],
    }
    reportesService.getReportesPorMesService.mockResolvedValue(mockResult)

    const res = await request(app).get('/api/reportes/2025/10').expect(200)
    expect(res.body.success).toBe(true)
    expect(res.body.count).toBe(2)
  })

  test('GET /api/reportes/:year/:month/:day/entrada devuelve detalles de entrada', async () => {
    const mockResult = {
      usuario: { nombreUsuario: 'Alonso' },
      data: [{ producto: 'Coca-Cola' }],
    }
    reportesService.getDetalleEntradaService.mockResolvedValue(mockResult)

    const res = await request(app)
      .get('/api/reportes/2025/10/25/entrada')
      .expect(200)
    expect(res.body.success).toBe(true)
    expect(res.body.usuario.nombreUsuario).toBe('Alonso')
  })

  test('GET /api/reportes/:year/:month/:day/salida devuelve detalles de salida', async () => {
    const mockResult = {
      usuario: { nombreUsuario: 'Eliel' },
      data: [{ producto: 'Cloro' }],
    }
    reportesService.getDetalleSalidaService.mockResolvedValue(mockResult)

    const res = await request(app)
      .get('/api/reportes/2025/10/25/salida')
      .expect(200)
    expect(res.body.data[0].producto).toBe('Cloro')
  })
})
