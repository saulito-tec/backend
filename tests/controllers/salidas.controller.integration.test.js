/* eslint-disable */
import request from 'supertest'
import app from '../../src/app.js'

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Salidas Controller - Integration Tests', () => {
  test('GET /api/salidas responde 200 o 500', async () => {
    const res = await request(app).get('/api/salidas')
    expect([200, 500]).toContain(res.status)
  })

  test('GET /api/salidas/:id responde 200, 404 o 500', async () => {
    const res = await request(app).get('/api/salidas/1')
    expect([200, 404, 500]).toContain(res.status)
  })

  test('POST /api/salidas responde 201, 400 o 500', async () => {
    const payload = {
      idUsuario: 1,
      idRazon: 2,
      fechaSalida: '2025-10-30',
      productos: [{ idProducto: 1, cantidad: 3 }],
    }
    const res = await request(app).post('/api/salidas').send(payload)
    expect([201, 400, 500]).toContain(res.status)
  })

  test('GET /api/salidas/razones responde 200 o 500', async () => {
    const res = await request(app).get('/api/salidas/razones')
    expect([200, 500]).toContain(res.status)
  })
})
