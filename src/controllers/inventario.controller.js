import {
  getAllInventarioService,
  getInventarioByIdService,
  updateInventarioService,
} from '../services/inventarioService.ts'

export const getAllInventario = async (req, res) => {
  try {
    const inventario = await getAllInventarioService()
    res.status(200).json({
      success: true,
      count: inventario.length,
      data: inventario,
    })
  } catch (error) {
    console.error('Error al obtener el inventario:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

export const getInventarioById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const inventario = await getInventarioByIdService(id)

    if (!inventario) {
      return res.status(404).json({
        success: false,
        message: 'Inventario no encontrado',
      })
    }

    res.status(200).json({
      success: true,
      data: inventario,
    })
  } catch (error) {
    console.error('Error al obtener el inventario por ID:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

export const updateInventario = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { idProducto_producto, cantidadTotal, idUnidad_unidad, fechaFinal } =
      req.body

    if (
      !idProducto_producto ||
      !cantidadTotal ||
      !idUnidad_unidad ||
      !fechaFinal
    ) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos',
      })
    }

    const updated = await updateInventarioService(id, {
      idProducto_producto,
      cantidadTotal: Number(cantidadTotal),
      idUnidad_unidad,
      fechaFinal: new Date(fechaFinal),
    })

    res.status(200).json({
      success: true,
      message: 'Inventario actualizado correctamente',
      data: updated,
    })
  } catch (error) {
    console.error('Error al actualizar el inventario:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}
