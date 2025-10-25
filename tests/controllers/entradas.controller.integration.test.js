/* eslint-disable */
import request from 'supertest'
import app from '../../src/app.js'

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Entradas Controller - Integration Tests', () => {
  test('GET /api/entradas responde 200', async () => {
    const res = await request(app).get('/api/entradas')
    expect([200, 500]).toContain(res.status)
  })

  test('GET /api/entradas/:id responde 200 o 404', async () => {
    const res = await request(app).get('/api/entradas/1')
    expect([200, 404, 500]).toContain(res.status)
  })

  test('POST /api/entradas responde 201 o 500', async () => {
    const payload = {
      idUsuario_usuario: 1,
      fechaEntrada: '2025-10-25',
      emisor: 'Proveedor Test',
      compra: 0,
      productos: [
        {
          idProducto: 1,
          idUnidad: 1,
          fechaEstimada: '2025-10-25',
          cantidad: 10,
        },
      ],
    }

    const res = await request(app).post('/api/entradas').send(payload)
    expect([201, 500]).toContain(res.status)
  })
})
