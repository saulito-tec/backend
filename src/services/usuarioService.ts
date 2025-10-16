import prisma from '../config/db.js'
import bcrypt from 'bcrypt'
import type {
  IUsuario,
  ICreateUsuario,
  IUpdateUsuario,
} from '../valueObjects/usuarioVO.ts'

export async function getAllUsuariosService(): Promise<IUsuario[]> {
  return prisma.usuario.findMany({
    select: {
      idUsuario: true,
      nombreUsuario: true,
      apellidoPaterno: true,
      apellidoMaterno: true,
      permisoUsuario: true,
    },
  })
}

export async function getUsuarioByIdService(
  id: number
): Promise<IUsuario | null> {
  return prisma.usuario.findUnique({
    where: { idUsuario: id },
    select: {
      idUsuario: true,
      nombreUsuario: true,
      apellidoPaterno: true,
      apellidoMaterno: true,
      permisoUsuario: true,
    },
  })
}

export async function createUsuarioService(
  data: ICreateUsuario
): Promise<IUsuario> {
  const hashPassword = await bcrypt.hash(data.password, 10)
  return prisma.usuario.create({
    data: {
      nombreUsuario: data.nombreUsuario,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      permisoUsuario: data.permisoUsuario,
      hashPassword,
    },
  })
}

export async function updateUsuarioService(
  data: IUpdateUsuario
): Promise<IUsuario> {
  const updateData: Partial<IUsuario> = {
    nombreUsuario: data.nombreUsuario,
    apellidoPaterno: data.apellidoPaterno,
    apellidoMaterno: data.apellidoMaterno,
    permisoUsuario: data.permisoUsuario,
  }

  if (data.password) {
    updateData.hashPassword = await bcrypt.hash(data.password, 10)
  }

  return prisma.usuario.update({
    where: { idUsuario: data.idUsuario },
    data: updateData,
  })
}

export async function deleteUsuarioService(id: number): Promise<void> {
  await prisma.usuario.delete({ where: { idUsuario: id } })
}
