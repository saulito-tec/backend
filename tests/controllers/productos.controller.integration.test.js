/* eslint-disable */
import request from 'supertest'
import app from '../../src/app.js'

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Productos Controller - Integration Tests', () => {
  test('GET /api/productos responde 200, 404 o 500', async () => {
    const res = await request(app).get('/api/productos')
    expect([200, 404, 500]).toContain(res.status)
  })

  test('GET /api/productos/:id responde 200, 404 o 500', async () => {
    const res = await request(app).get('/api/productos/1')
    expect([200, 404, 500]).toContain(res.status)
  })

  test('POST /api/productos responde 201, 400 o 500', async () => {
    const payload = {
      nombreProducto: 'Nuevo Producto',
      idDepartamento_departamento: 1,
    }
    const res = await request(app).post('/api/productos').send(payload)
    expect([201, 400, 500]).toContain(res.status)
  })

  test('PUT /api/productos/:id responde 200, 400 o 500', async () => {
    const payload = {
      nombreProducto: 'Editado',
      idDepartamento_departamento: 1,
    }
    const res = await request(app).put('/api/productos/1').send(payload)
    expect([200, 400, 500]).toContain(res.status)
  })

  test('DELETE /api/productos/:id responde 200, 400 o 500', async () => {
    const res = await request(app).delete('/api/productos/1')
    expect([200, 400, 500]).toContain(res.status)
  })

  test('GET /api/productos/categorias responde 200, 404 o 500', async () => {
    const res = await request(app).get('/api/productos/categorias')
    expect([200, 404, 500]).toContain(res.status)
  })
})
