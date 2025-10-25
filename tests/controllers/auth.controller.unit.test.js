/* eslint-disable */
import request from 'supertest'
import server from '../../src/app.js'
import * as authService from '../../src/services/authService.ts'

jest.mock('../../src/services/authService.ts', () => ({
  loginService: jest.fn(),
}))

describe('Auth Controller Unit Tests', () => {
  afterAll(async () => {
    jest.clearAllMocks()
  })

  test('Given missing username or password When login Then 400', async () => {
    authService.loginService.mockRejectedValue(
      new Error('Nombre de usuario y contraseña son requeridos')
    )

    const res = await request(server)
      .post('/api/auth/login')
      .send({ nombreUsuario: 'alonso' })
      .expect(400)

    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe(
      'Nombre de usuario y contraseña son requeridos'
    )
  })

  test('Given invalid credentials When login Then 401', async () => {
    authService.loginService.mockRejectedValue(
      new Error('Credenciales inválidas')
    )

    await request(server)
      .post('/api/auth/login')
      .send({ nombreUsuario: 'alonso', password: 'wrong' })
      .expect(401)
  })

  test('Given valid credentials When login Then 200 and returns token', async () => {
    const mockResponse = {
      token: 'fakeToken',
      user: {
        id: 1,
        nombreUsuario: 'alonso',
        nombreCompleto: 'alonso parra alc',
        permisoUsuario: 1,
      },
    }

    authService.loginService.mockResolvedValue(mockResponse)

    const res = await request(server)
      .post('/api/auth/login')
      .send({ nombreUsuario: 'alonso', password: '1234' })
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.token).toBe('fakeToken')
    expect(res.body.user.nombreUsuario).toBe('alonso')
  })
})
