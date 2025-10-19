import {
  getAllProductosService,
  getProductoByIdService,
  createProductoService,
  updateProductoService,
  deleteProductoService,
  getAllCategoriesService,
} from '../services/productoService.ts'

export const getAllProductos = async (req, res) => {
  try {
    const productos = await getAllProductosService()

    if (!productos || productos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron productos',
      })
    }

    res.status(200).json({
      success: true,
      count: productos.length,
      data: productos,
    })
  } catch (error) {
    console.error('Error al obtener los productos:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

export const getProductoById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const producto = await getProductoByIdService(id)

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      })
    }

    res.status(200).json({
      success: true,
      data: producto,
    })
  } catch (error) {
    console.error('Error al obtener el producto:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

export const createProducto = async (req, res) => {
  try {
    const {
      nombreProducto,
      idDepartamento_departamento,
      emoji,
      idUnidad_unidad,
    } = req.body

    if (!nombreProducto || !idDepartamento_departamento) {
      return res.status(400).json({
        success: false,
        message: 'nombreProducto e idDepartamento_departamento son requeridos',
      })
    }

    const producto = await createProductoService({
      nombreProducto,
      idDepartamento_departamento,
      emoji: emoji ?? '📦',
      idUnidad_unidad,
    })

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: producto,
    })
  } catch (error) {
    console.error('Error al crear el producto:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

export const updateProducto = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { nombreProducto, idDepartamento_departamento, emoji } = req.body

    if (!id || !nombreProducto || !idDepartamento_departamento) {
      return res.status(400).json({
        success: false,
        message:
          'idProducto, nombreProducto e idDepartamento_departamento son requeridos',
      })
    }

    const producto = await updateProductoService(id, {
      nombreProducto,
      idDepartamento_departamento,
      emoji: emoji ?? '📦',
    })

    res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: producto,
    })
  } catch (error) {
    console.error('Error al actualizar el producto:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

export const deleteProducto = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'idProducto es requerido',
      })
    }

    await deleteProductoService(id)

    res.status(200).json({
      success: true,
      message: 'Producto eliminado exitosamente',
    })
  } catch (error) {
    console.error('Error al eliminar el producto:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

export const getCategorias = async (req, res) => {
  try {
    const categories = await getAllCategoriesService()

    if (!categories || categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron categorias',
      })
    }

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    })
  } catch (e) {
    console.error('Error al obtener las categorias ', e)
    return res.status(404).json({
      success: false,
      message: 'No se encontraron productos',
    })
  }
}
