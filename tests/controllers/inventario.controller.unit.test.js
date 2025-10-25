/* eslint-disable */
import request from 'supertest'
import app from '../../src/app.js'
import * as inventarioService from '../../src/services/inventarioService.ts'

jest.mock('../../src/services/inventarioService.ts', () => ({
  getAllInventarioService: jest.fn(),
  getInventarioByIdService: jest.fn(),
  updateInventarioService: jest.fn(),
}))

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Inventario Controller - Unit Tests', () => {
  afterEach(() => jest.clearAllMocks())

  test('GET /api/inventario debe devolver lista de inventario', async () => {
    const mockInventario = [{ idInventario: 1, cantidadTotal: 100 }]
    inventarioService.getAllInventarioService.mockResolvedValue(mockInventario)

    const res = await request(app).get('/api/inventario').expect(200)
    expect(res.body.success).toBe(true)
    expect(res.body.count).toBe(1)
  })

  test('GET /api/inventario/:id debe devolver un registro', async () => {
    const mockRegistro = { idInventario: 1, cantidadTotal: 200 }
    inventarioService.getInventarioByIdService.mockResolvedValue(mockRegistro)

    const res = await request(app).get('/api/inventario/1').expect(200)
    expect(res.body.data).toEqual(mockRegistro)
  })

  test('GET /api/inventario/:id debe devolver 404 si no existe', async () => {
    inventarioService.getInventarioByIdService.mockResolvedValue(null)
    const res = await request(app).get('/api/inventario/999').expect(404)
    expect(res.body.success).toBe(false)
  })

  test('PUT /api/inventario/:id debe actualizar registro', async () => {
    const mockUpdated = { idInventario: 1, cantidadTotal: 200 }
    inventarioService.updateInventarioService.mockResolvedValue(mockUpdated)

    const payload = {
      idProducto_producto: 2,
      cantidadTotal: 200,
      idUnidad_unidad: 1,
      fechaFinal: '2025-10-30',
    }

    const res = await request(app)
      .put('/api/inventario/1')
      .send(payload)
      .expect(200)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toBe('Inventario actualizado correctamente')
  })

  test('PUT /api/inventario/:id debe devolver 400 si faltan campos', async () => {
    const res = await request(app).put('/api/inventario/1').send({}).expect(400)
    expect(res.body.message).toBe('Todos los campos son requeridos')
  })
})
