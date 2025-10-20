import {
  CrearSalida,
  ObtenerSalidas,
  ObtenerSalidaPorId,
  ObtenerRazones,
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
    const { idUsuario, idRazon, fechaSalida, productos } = req.body

    if (!idUsuario || !idRazon || !fechaSalida || !productos) {
      return res.status(400).json({
        success: false,
        message:
          'Faltan campos obligatorios: idUsuario, idRazon, fechaSalida o productos',
      })
    }

    const salida = {
      idUsuario,
      idRazon,
      fechaSalida: new Date(fechaSalida),
    }

    const productosSalida = productos.map((p) => ({
      idProducto: Number(p.idProducto),
      cantidad: Number(p.cantidad),
    }))

    const resultado = await CrearSalida({ salida, productos: productosSalida })

    res.status(201).json({
      success: true,
      message: 'Salida creada correctamente',
      productosActualizados: resultado,
    })
  } catch (error) {
    console.error('Error al crear la salida:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error interno del servidor',
    })
  }
}

export const getAllRazones = async (req, res) => {
  try {
    const razones = await ObtenerRazones()
    res.json({ success: true, data: razones })
  } catch (error) {
    console.error('Error al obtener razones:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}
