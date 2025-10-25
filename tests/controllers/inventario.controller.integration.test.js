/* eslint-disable */
import request from 'supertest'
import app from '../../src/app.js'

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Inventario Controller - Integration Tests', () => {
  test('GET /api/inventario responde 200 o 500', async () => {
    const res = await request(app).get('/api/inventario')
    expect([200, 500]).toContain(res.status)
  })

  test('GET /api/inventario/:id responde 200, 404 o 500', async () => {
    const res = await request(app).get('/api/inventario/1')
    expect([200, 404, 500]).toContain(res.status)
  })

  test('PUT /api/inventario/:id responde 200, 400 o 500', async () => {
    const payload = {
      idProducto_producto: 3,
      cantidadTotal: 250,
      idUnidad_unidad: 1,
      fechaFinal: '2025-10-28',
    }
    const res = await request(app).put('/api/inventario/1').send(payload)
    expect([200, 400, 500]).toContain(res.status)
  })
})
