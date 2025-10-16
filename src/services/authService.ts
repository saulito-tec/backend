import prisma from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type {
  ILoginRequest,
  IUser,
  ILoginResponse,
} from '../valueObjects/authVO.js'

const JWT_SECRET = process.env.JWT_SECRET as string

export async function loginService({
  nombreUsuario,
  password,
}: ILoginRequest): Promise<ILoginResponse> {
  if (!nombreUsuario || !password) {
    throw new Error('Nombre de usuario y contraseña son requeridos')
  }

  const user = (await prisma.usuario.findFirst({
    where: { nombreUsuario },
    select: {
      idUsuario: true,
      nombreUsuario: true,
      apellidoPaterno: true,
      apellidoMaterno: true,
      permisoUsuario: true,
      hashPassword: true,
    },
  })) as IUser | null

  if (!user) {
    throw new Error('Credenciales inválidas')
  }

  const isValidPassword = await bcrypt.compare(password, user.hashPassword)
  if (!isValidPassword) {
    throw new Error('Credenciales inválidas')
  }

  const token = jwt.sign(
    {
      id: user.idUsuario,
      nombreUsuario: user.nombreUsuario,
      permisoUsuario: user.permisoUsuario,
    },
    JWT_SECRET,
    { expiresIn: '30d' }
  )

  return {
    token,
    user: {
      id: user.idUsuario,
      nombreUsuario: user.nombreUsuario,
      nombreCompleto: `${user.nombreUsuario} ${user.apellidoPaterno} ${user.apellidoMaterno}`,
      apellidoPaterno: user.apellidoPaterno,
      apellidoMaterno: user.apellidoMaterno,
      permisoUsuario: user.permisoUsuario,
    },
  }
}
