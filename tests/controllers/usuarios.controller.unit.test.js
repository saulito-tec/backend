/* eslint-disable */
import request from 'supertest'
import app from '../../src/app.js'
import * as usuarioService from '../../src/services/usuarioService.ts'

jest.mock('../../src/services/usuarioService.ts', () => ({
  getAllUsuariosService: jest.fn(),
  getUsuarioByIdService: jest.fn(),
  createUsuarioService: jest.fn(),
  updateUsuarioService: jest.fn(),
  deleteUsuarioService: jest.fn(),
}))

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Usuarios Controller - Unit Tests', () => {
  afterEach(() => jest.clearAllMocks())

  test('GET /api/usuarios devuelve lista de usuarios', async () => {
    const mockUsuarios = [{ idUsuario: 1, nombreUsuario: 'Alonso' }]
    usuarioService.getAllUsuariosService.mockResolvedValue(mockUsuarios)

    const res = await request(app).get('/api/usuarios').expect(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data).toEqual(mockUsuarios)
  })

  test('GET /api/usuarios/:id devuelve un usuario existente', async () => {
    const mockUsuario = { idUsuario: 1, nombreUsuario: 'Eliel' }
    usuarioService.getUsuarioByIdService.mockResolvedValue(mockUsuario)

    const res = await request(app).get('/api/usuarios/1').expect(200)
    expect(res.body.data.nombreUsuario).toBe('Eliel')
  })

  test('GET /api/usuarios/:id devuelve 404 si no existe', async () => {
    usuarioService.getUsuarioByIdService.mockResolvedValue(null)
    const res = await request(app).get('/api/usuarios/99').expect(404)
    expect(res.body.message).toMatch(/no encontrado/i)
  })

  test('POST /api/usuarios crea un usuario correctamente', async () => {
    const nuevo = { idUsuario: 2, nombreUsuario: 'Saul' }
    usuarioService.createUsuarioService.mockResolvedValue(nuevo)

    const res = await request(app)
      .post('/api/usuarios')
      .send({
        nombreUsuario: 'Saul',
        apellidoPaterno: 'Sigala',
        apellidoMaterno: 'Flores',
        permisoUsuario: 1,
        password: '12345',
      })
      .expect(201)

    expect(res.body.success).toBe(true)
    expect(res.body.data).toEqual(nuevo)
  })

  test('POST /api/usuarios devuelve 400 si faltan campos', async () => {
    const res = await request(app).post('/api/usuarios').send({}).expect(400)
    expect(res.body.message).toMatch(/requeridos/i)
  })

  test('PUT /api/usuarios/:id actualiza usuario', async () => {
    const mockUser = { idUsuario: 1, nombreUsuario: 'NuevoNombre' }
    usuarioService.updateUsuarioService.mockResolvedValue(mockUser)

    const res = await request(app)
      .put('/api/usuarios/1')
      .send({ nombreUsuario: 'NuevoNombre' })
      .expect(200)

    expect(res.body.data.nombreUsuario).toBe('NuevoNombre')
  })

  test('DELETE /api/usuarios/:id elimina correctamente', async () => {
    usuarioService.deleteUsuarioService.mockResolvedValue()
    const res = await request(app).delete('/api/usuarios/1').expect(200)
    expect(res.body.message).toMatch(/eliminado/i)
  })
})
