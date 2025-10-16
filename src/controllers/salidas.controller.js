import {
  CrearSalida,
  ObtenerSalidas,
  ObtenerSalidaPorId,
} from '../services/salidaService.ts'

export const getAllSalidas = async (req, res) => {
  try {
    const salidas = await ObtenerSalidas()
    res.json({ success: true, data: salidas })
  } catch (error) {
    console.error('Error al obtener salidas:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

export const getSalidaById = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const salida = await ObtenerSalidaPorId(id)

    if (!salida)
      return res
        .status(404)
        .json({ success: false, message: 'Salida no encontrada' })

    res.json({ success: true, data: salida })
  } catch (error) {
    console.error('Error al obtener salida:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

export const createSalida = async (req, res) => {
  try {
    const {
      idUsuario_usuario,
      idEntradaProducto_entradaProducto,
      idRazon_razon,
      fechaSalida,
      cantidadSalida,
    } = req.body

    const nuevaSalida = await CrearSalida({
      idUsuario_usuario: Number(idUsuario_usuario),
      idEntradaProducto_entradaProducto: Number(
        idEntradaProducto_entradaProducto
      ),
      idRazon_razon: Number(idRazon_razon),
      fechaSalida: new Date(fechaSalida),
      cantidadSalida: Number(cantidadSalida),
    })

    res.status(201).json({
      success: true,
      message: 'Salida creada correctamente',
      data: nuevaSalida,
    })
  } catch (error) {
    console.error('Error al crear salida:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error interno del servidor',
    })
  }
}
