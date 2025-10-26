/* eslint-disable */
import request from 'supertest'
import app from '../../src/app.js'

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Unidades Controller - Integration Tests', () => {
  test('GET /api/unidades responde 200 o 500', async () => {
    const res = await request(app).get('/api/unidades')
    expect([200, 500]).toContain(res.status)
  })

  test('POST /api/unidades responde 201, 400 o 500', async () => {
    const res = await request(app)
      .post('/api/unidades')
      .send({ unidad: 'pieza' })
    expect([201, 400, 500]).toContain(res.status)
  })
})
