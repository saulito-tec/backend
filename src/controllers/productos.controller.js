import prisma from '../config/db.js'

export const productos = async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      select: {
        idProducto: true,
        nombreProducto: true,
        idDepartamento_departamento: true,
      },
    })
    if (!productos) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      })
    }

    res.json(productos)
  } catch (error) {
    console.error('Error al obtener los productos:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

export const producto = async (req, res) => {
  try {
    const { id } = req.params
    const producto = await prisma.producto.findFirst({
      select: {
        idProducto: true,
        nombreProducto: true,
        idDepartamento_departamento: true,
      },
      where: { idProducto: Number(id) },
    })

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      })
    }

    res.json(producto)
  } catch (error) {
    console.error('Error al obtener el producto:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

export const Postproducto = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'No se recibió cuerpo en la solicitud (req.body vacío)',
      })
    }
    const { nombreProducto, idDepartamento_departamento } = req.body

    if (!nombreProducto || !idDepartamento_departamento) {
      return res.status(400).json({
        success: false,
        message: 'Nombre de producto e idDepartamento son requeridos',
      })
    }
    const producto = await prisma.producto.create({
      data: {
        nombreProducto,
        idDepartamento_departamento,
      },
    })

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      producto,
    })
  } catch (error) {
    console.error('Error al obtener el producto:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

export const PutProducto = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'No se recibió cuerpo en la solicitud (req.body vacío)',
      })
    }
    const { id } = req.params
    const { nombreProducto, idDepartamento_departamento } = req.body

    if (!id || !nombreProducto || !idDepartamento_departamento) {
      return res.status(400).json({
        success: false,
        message:
          'idProducto, nombreProducto e idDepartamento_departamento son requeridos',
      })
    }
    const producto = await prisma.producto.update({
      where: { idProducto: Number(id) },
      data: {
        nombreProducto,
        idDepartamento_departamento,
      },
    })

    res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente',
      producto,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

export const DeleteProducto = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'idProducto es requerido',
      })
    }
    await prisma.producto.delete({
      where: { idProducto: Number(id) },
    })
    res.status(200).json({
      success: true,
      message: 'Producto eliminado exitosamente',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}
