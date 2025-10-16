import {
  getAllUsuariosService,
  getUsuarioByIdService,
  createUsuarioService,
  updateUsuarioService,
  deleteUsuarioService,
} from '../services/usuarioService.ts'

export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await getAllUsuariosService()
    res.json({ success: true, data: usuarios })
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    res
      .status(500)
      .json({ success: false, message: 'Error interno del servidor' })
  }
}

export const getUsuarioById = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const usuario = await getUsuarioByIdService(id)
    if (!usuario)
      return res
        .status(404)
        .json({ success: false, message: 'Usuario no encontrado' })

    res.json({ success: true, data: usuario })
  } catch (error) {
    console.error('Error al obtener usuario:', error)
    res
      .status(500)
      .json({ success: false, message: 'Error interno del servidor' })
  }
}

export const createUsuario = async (req, res) => {
  try {
    const {
      nombreUsuario,
      apellidoPaterno,
      apellidoMaterno,
      permisoUsuario,
      password,
    } = req.body

    if (
      !nombreUsuario ||
      !apellidoPaterno ||
      !apellidoMaterno ||
      !permisoUsuario ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos',
      })
    }

    const nuevoUsuario = await createUsuarioService({
      nombreUsuario,
      apellidoPaterno,
      apellidoMaterno,
      permisoUsuario: Number(permisoUsuario),
      password,
    })

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: nuevoUsuario,
    })
  } catch (error) {
    console.error('Error al crear usuario:', error)
    res
      .status(500)
      .json({ success: false, message: 'Error interno del servidor' })
  }
}

export const updateUsuario = async (req, res) => {
  try {
    const idUsuario = Number(req.params.id)
    const {
      nombreUsuario,
      apellidoPaterno,
      apellidoMaterno,
      permisoUsuario,
      password,
    } = req.body

    const usuarioActualizado = await updateUsuarioService({
      idUsuario,
      nombreUsuario,
      apellidoPaterno,
      apellidoMaterno,
      permisoUsuario,
      password,
    })

    res.json({
      success: true,
      message: 'Usuario actualizado correctamente',
      data: usuarioActualizado,
    })
  } catch (error) {
    console.error('Error al actualizar usuario:', error)
    res
      .status(500)
      .json({ success: false, message: 'Error interno del servidor' })
  }
}

export const deleteUsuario = async (req, res) => {
  try {
    const id = Number(req.params.id)
    await deleteUsuarioService(id)
    res.json({ success: true, message: 'Usuario eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    res
      .status(500)
      .json({ success: false, message: 'Error interno del servidor' })
  }
}
