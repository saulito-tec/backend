/* eslint-disable */
import prisma from '../../src/config/db.js'
import bcrypt from 'bcrypt'
import {
  getAllUsuariosService,
  getUsuarioByIdService,
  createUsuarioService,
  updateUsuarioService,
  deleteUsuarioService,
} from '../../src/services/usuarioService.ts'

jest.mock('bcrypt')
jest.mock('../../src/config/db.js', () => ({
  usuario: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}))

describe('Usuarios Service - Unit Tests', () => {
  afterEach(() => jest.clearAllMocks())

  test('getAllUsuariosService devuelve lista de usuarios', async () => {
    prisma.usuario.findMany.mockResolvedValue([{ idUsuario: 1 }])
    const result = await getAllUsuariosService()
    expect(result.length).toBe(1)
  })

  test('getUsuarioByIdService devuelve usuario por ID', async () => {
    prisma.usuario.findUnique.mockResolvedValue({ idUsuario: 2 })
    const result = await getUsuarioByIdService(2)
    expect(result.idUsuario).toBe(2)
  })

  test('createUsuarioService hashea la contraseña y crea usuario', async () => {
    bcrypt.hash.mockResolvedValue('hashedPass')
    prisma.usuario.create.mockResolvedValue({ idUsuario: 1 })

    const result = await createUsuarioService({
      nombreUsuario: 'Alonso',
      apellidoPaterno: 'Parra',
      apellidoMaterno: 'Lopez',
      permisoUsuario: 1,
      password: '1234',
    })

    expect(bcrypt.hash).toHaveBeenCalledWith('1234', 10)
    expect(prisma.usuario.create).toHaveBeenCalled()
    expect(result.idUsuario).toBe(1)
  })

  test('updateUsuarioService actualiza usuario correctamente', async () => {
    bcrypt.hash.mockResolvedValue('newHash')
    prisma.usuario.update.mockResolvedValue({ idUsuario: 3 })

    const result = await updateUsuarioService({
      idUsuario: 3,
      nombreUsuario: 'Eliel',
      password: 'nueva',
    })

    expect(bcrypt.hash).toHaveBeenCalled()
    expect(result.idUsuario).toBe(3)
  })

  test('deleteUsuarioService elimina usuario', async () => {
    prisma.usuario.delete.mockResolvedValue()
    await deleteUsuarioService(4)
    expect(prisma.usuario.delete).toHaveBeenCalledWith({
      where: { idUsuario: 4 },
    })
  })
})
