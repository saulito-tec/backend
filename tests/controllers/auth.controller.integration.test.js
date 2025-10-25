/* eslint-disable */
import request from 'supertest'
import server from '../../src/app.js'
import prisma from '../../src/config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

jest.mock('../../src/config/db.js', () => ({
  usuario: {
    findFirst: jest.fn(),
  },
}))
jest.mock('bcrypt')
jest.mock('jsonwebtoken')

describe('Auth Controller Integration Tests', () => {
  afterAll(async () => {
    jest.clearAllMocks()
  })

  test('Given missing fields When POST /auth/login Then 400', async () => {
    await request(server)
      .post('/api/auth/login')
      .send({ nombreUsuario: 'alonso' })
      .expect(400)
  })

  test('Given wrong credentials When POST /auth/login Then 401', async () => {
    prisma.usuario.findFirst.mockResolvedValue({
      idUsuario: 1,
      nombreUsuario: 'alonso',
      hashPassword: 'hashed',
    })
    bcrypt.compare.mockResolvedValue(false)

    await request(server)
      .post('/api/auth/login')
      .send({ nombreUsuario: 'alonso', password: 'wrong' })
      .expect(401)
  })

  test('Given valid credentials When POST /auth/login Then 200', async () => {
    prisma.usuario.findFirst.mockResolvedValue({
      idUsuario: 1,
      nombreUsuario: 'alonso',
      apellidoPaterno: 'parra',
      apellidoMaterno: 'alc',
      permisoUsuario: 1,
      hashPassword: 'hashed123',
    })
    bcrypt.compare.mockResolvedValue(true)
    jwt.sign.mockReturnValue('fakeToken123')

    const res = await request(server)
      .post('/api/auth/login')
      .send({ nombreUsuario: 'alonso', password: '1234' })
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.token).toBe('fakeToken123')
    expect(res.body.user.nombreUsuario).toBe('alonso')
  })
})
