import prisma from '../config/db.js'
import bcrypt from 'bcrypt'

const sanitizeUsuario = (u) => ({
  idUsuario: u.idUsuario,
  nombreUsuario: u.nombreUsuario,
  apellidoPaterno: u.apellidoPaterno,
  apellidoMaterno: u.apellidoMaterno,
  permisoUsuario: u.permisoUsuario,
})

export const getAllUsuarios = async (req, res) => {
  try {
    const data = await prisma.usuario.findMany({
      select: {
        idUsuario: true,
        nombreUsuario: true,
        apellidoPaterno: true,
        apellidoMaterno: true,
        permisoUsuario: true,
      },
    })
    res.json(data.map(sanitizeUsuario))
  } catch (error) {
    console.error('Error al obtener los usuarios:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
    })
    res
      .status(500)
      .json({ success: false, message: 'Error interno del servidor' })
  }
}

export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params
    const u = await prisma.usuario.findFirst({
      where: { idUsuario: Number(id) },
      select: {
        idUsuario: true,
        nombreUsuario: true,
        apellidoPaterno: true,
        apellidoMaterno: true,
        permisoUsuario: true,
      },
    })

    if (!u) {
      return res
        .status(404)
        .json({ success: false, message: 'Usuario no encontrado' })
    }
    res.json(sanitizeUsuario(u))
  } catch (error) {
    console.error('Error al obtener el usuario:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
    })
    res
      .status(500)
      .json({ success: false, message: 'Error interno del servidor' })
  }
}

export const createUsuario = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'No se recibió cuerpo en la solicitud (req.body vacío)',
      })
    }
    const {
      nombreUsuario,
      apellidoPaterno,
      apellidoMaterno,
      permisoUsuario,
      hashPassword,
    } = req.body

    if (
      !nombreUsuario ||
      !apellidoPaterno ||
      !apellidoMaterno ||
      permisoUsuario === undefined ||
      permisoUsuario === null ||
      !hashPassword
    ) {
      return res.status(400).json({
        success: false,
        message:
          'nombreUsuario, apellidoPaterno, apellidoMaterno, permisoUsuario y hashPassword son requeridos',
      })
    }

    // Hash the password and store in hashPassword field
    const hashedPassword = await bcrypt.hash(hashPassword, 10)

    const created = await prisma.usuario.create({
      data: {
        nombreUsuario,
        apellidoPaterno,
        apellidoMaterno,
        permisoUsuario: Number(permisoUsuario),
        hashPassword: hashedPassword, // Use the hashed password
      },
      select: {
        idUsuario: true,
        nombreUsuario: true,
        apellidoPaterno: true,
        apellidoMaterno: true,
        permisoUsuario: true,
      },
    })

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      usuario: sanitizeUsuario(created),
    })
  } catch (error) {
    console.error('Error al crear el usuario:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
    })
    res
      .status(500)
      .json({ success: false, message: 'Error interno del servidor' })
  }
}

export const updateUsuario = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'No se recibió cuerpo en la solicitud (req.body vacío)',
      })
    }
    const { id } = req.params
    const {
      nombreUsuario,
      apellidoPaterno,
      apellidoMaterno,
      permisoUsuario,
      hashPassword, // opcional en update
    } = req.body

    if (
      !id ||
      !nombreUsuario ||
      !apellidoPaterno ||
      !apellidoMaterno ||
      permisoUsuario === undefined ||
      permisoUsuario === null
    ) {
      return res.status(400).json({
        success: false,
        message:
          'id, nombreUsuario, apellidoPaterno, apellidoMaterno y permisoUsuario son requeridos',
      })
    }

    const dataToUpdate = {
      nombreUsuario,
      apellidoPaterno,
      apellidoMaterno,
      permisoUsuario: Number(permisoUsuario),
    }

    // Hash password if provided and store in hashPassword field AGUASSSS
    if (hashPassword) {
      dataToUpdate.hashPassword = await bcrypt.hash(hashPassword, 10)
    }

    const updated = await prisma.usuario.update({
      where: { idUsuario: Number(id) },
      data: dataToUpdate,
      select: {
        idUsuario: true,
        nombreUsuario: true,
        apellidoPaterno: true,
        apellidoMaterno: true,
        permisoUsuario: true,
      },
    })

    res.status(200).json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      usuario: sanitizeUsuario(updated),
    })
  } catch (error) {
    if (error?.code === 'P2025') {
      return res
        .status(404)
        .json({ success: false, message: 'Usuario no encontrado' })
    }
    console.error('Error al actualizar el usuario:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
    })
    res
      .status(500)
      .json({ success: false, message: 'Error interno del servidor' })
  }
}

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: 'idUsuario es requerido' })
    }

    await prisma.usuario.delete({ where: { idUsuario: Number(id) } })

    res
      .status(200)
      .json({ success: true, message: 'Usuario eliminado exitosamente' })
  } catch (error) {
    if (error?.code === 'P2025') {
      return res
        .status(404)
        .json({ success: false, message: 'Usuario no encontrado' })
    }
    console.error('Error al eliminar el usuario:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
    })
    res
      .status(500)
      .json({ success: false, message: 'Error interno del servidor' })
  }
}
