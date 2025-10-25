/* eslint-disable */
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../src/config/db.js'
import { loginService } from '../../src/services/authService.ts'

jest.mock('bcrypt')
jest.mock('jsonwebtoken')
jest.mock('../../src/config/db.js', () => ({
  usuario: {
    findFirst: jest.fn(),
  },
}))

describe('Auth Service Unit Tests', () => {
  const mockUser = {
    idUsuario: 1,
    nombreUsuario: 'alonso',
    apellidoPaterno: 'parra',
    apellidoMaterno: 'alc',
    permisoUsuario: 1,
    hashPassword: 'hashed123',
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Given missing fields When login Then throws error', async () => {
    await expect(
      loginService({ nombreUsuario: '', password: '' })
    ).rejects.toThrow('Nombre de usuario y contraseña son requeridos')
  })

  test('Given non-existing user When login Then throws invalid credentials', async () => {
    prisma.usuario.findFirst.mockResolvedValue(null)

    await expect(
      loginService({ nombreUsuario: 'fake', password: '1234' })
    ).rejects.toThrow('Credenciales inválidas')
  })

  test('Given invalid password When login Then throws invalid credentials', async () => {
    prisma.usuario.findFirst.mockResolvedValue(mockUser)
    bcrypt.compare.mockResolvedValue(false)

    await expect(
      loginService({ nombreUsuario: 'alonso', password: 'badpass' })
    ).rejects.toThrow('Credenciales inválidas')
  })

  test('Given valid credentials When login Then returns token and user', async () => {
    prisma.usuario.findFirst.mockResolvedValue(mockUser)
    bcrypt.compare.mockResolvedValue(true)
    jwt.sign.mockReturnValue('fakeToken123')

    const result = await loginService({
      nombreUsuario: 'alonso',
      password: '1234',
    })

    expect(result).toHaveProperty('token', 'fakeToken123')
    expect(result.user.nombreUsuario).toBe('alonso')
    expect(result.user.nombreCompleto).toContain('parra')
  })
})
