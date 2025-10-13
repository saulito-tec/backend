import prisma from '../config/db.js'

// GET /api/inventario
export const getInventario = async (req, res) => {
  try {
    const inventario = await prisma.inventario.findMany({
      select: {
        idInventario: true,
        idProducto_producto: true,
        cantidadTotal: true,
        idUnidad_unidad: true,
        fechaFinal: true,
      },
    })

    res.json(inventario)
  } catch (error) {
    console.error('Error al obtener el inventario:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

// GET /api/inventario/:id
export const getInventarioById = async (req, res) => {
  try {
    const { id } = req.params

    const inventario = await prisma.inventario.findUnique({
      where: { idInventario: Number(id) },
      select: {
        idInventario: true,
        idProducto_producto: true,
        cantidadTotal: true,
        idUnidad_unidad: true,
        fechaFinal: true,
      },
    })

    if (!inventario) {
      return res.status(404).json({
        success: false,
        message: 'Inventario no encontrado',
      })
    }

    res.json(inventario)
  } catch (error) {
    console.error('Error al obtener el inventario por ID:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

// PUT /api/inventario/:id
export const updateInventarioById = async (req, res) => {
  try {
    const { id } = req.params
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

    const updated = await prisma.inventario.update({
      where: { idInventario: Number(id) },
      data: {
        idProducto_producto,
        cantidadTotal,
        idUnidad_unidad,
        fechaFinal,
      },
    })

    res.json(updated)
  } catch (error) {
    console.error('Error al actualizar el inventario:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}
