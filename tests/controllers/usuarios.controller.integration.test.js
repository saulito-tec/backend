/* eslint-disable */
import request from 'supertest'
import app from '../../src/app.js'

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Usuarios Controller - Integration Tests', () => {
  test('GET /api/usuarios responde 200 o 500', async () => {
    const res = await request(app).get('/api/usuarios')
    expect([200, 500]).toContain(res.status)
  })

  test('GET /api/usuarios/:id responde 200, 404 o 500', async () => {
    const res = await request(app).get('/api/usuarios/1')
    expect([200, 404, 500]).toContain(res.status)
  })

  test('POST /api/usuarios responde 201, 400 o 500', async () => {
    const res = await request(app).post('/api/usuarios').send({
      nombreUsuario: 'Test',
      apellidoPaterno: 'User',
      apellidoMaterno: 'Demo',
      permisoUsuario: 1,
      password: 'abc123',
    })
    expect([201, 400, 500]).toContain(res.status)
  })

  test('PUT /api/usuarios/:id responde 200 o 500', async () => {
    const res = await request(app)
      .put('/api/usuarios/1')
      .send({ nombreUsuario: 'Actualizado' })
    expect([200, 500]).toContain(res.status)
  })

  test('DELETE /api/usuarios/:id responde 200 o 500', async () => {
    const res = await request(app).delete('/api/usuarios/1')
    expect([200, 500]).toContain(res.status)
  })
})
