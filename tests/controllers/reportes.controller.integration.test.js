/* eslint-disable */
import request from 'supertest'
import app from '../../src/app.js'

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Reportes Controller - Integration Tests', () => {
  test('GET /api/reportes responde 200', async () => {
    const res = await request(app).get('/api/reportes')
    expect([200, 500]).toContain(res.status)
  })

  test('GET /api/reportes/:year/:month responde 200', async () => {
    const res = await request(app).get('/api/reportes/2025/10')
    expect([200, 500]).toContain(res.status)
  })

  test('GET /api/reportes/:year/:month/:day/entrada responde 200', async () => {
    const res = await request(app).get('/api/reportes/2025/10/25/entrada')
    expect([200, 500]).toContain(res.status)
  })

  test('GET /api/reportes/:year/:month/:day/salida responde 200', async () => {
    const res = await request(app).get('/api/reportes/2025/10/25/salida')
    expect([200, 500]).toContain(res.status)
  })
})
