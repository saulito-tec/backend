import {
  CrearEntrada,
  ObtenerEntradaPorId,
  ObtenerEntradas,
  getEntradasDeProducto,
} from '../services/entradaService.ts'

export const getAllEntradas = async (req, res) => {
  try {
    const entradas = await ObtenerEntradas()

    res.status(200).json({
      success: true,
      count: entradas.length,
      data: entradas,
    })
  } catch (error) {
    console.error('Error al obtener las entradas:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

export const getEntradaById = async (req, res) => {
  try {
    const idEntrada = parseInt(req.params.id)

    const entrada = await ObtenerEntradaPorId(idEntrada)

    if (!entrada) {
      return res.status(404).json({
        success: false,
        message: 'Entrada no encontrada',
      })
    }

    res.status(200).json({
      success: true,
      data: entrada,
    })
  } catch (error) {
    console.error('Error al obtener la entrada:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

export const createEntrada = async (req, res) => {
  try {
    const { idUsuario_usuario, fechaEntrada, emisor, compra, productos } =
      req.body

    const entrada = {
      idUsuario: idUsuario_usuario,
      fechaEntrada: new Date(fechaEntrada),
      emisor,
      compra,
    }

    const productosEntrada = productos.map((p) => ({
      idEntrada: 0,
      idProducto: p.idProducto,
      idUnidad: p.idUnidad,
      fechaEstimada: new Date(p.fechaEstimada),
      cantidad: Number(p.cantidad),
    }))

    const nuevaEntrada = await CrearEntrada({
      entrada,
      productos: productosEntrada,
    })

    res.status(201).json({
      success: true,
      message: 'Entrada creada correctamente',
      data: nuevaEntrada,
    })
  } catch (error) {
    console.error('Error al crear la entrada:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}

export const getAllEntradasById = async (req, res) => {
  try {
    const { id } = req.params
    const { limit = 5 } = req.query

    const entradas = await getEntradasDeProducto(id, limit)

    res.status(200).json({
      success: true,
      count: entradas.length,
      data: entradas,
    })
  } catch (error) {
    console.error('Error al obtener las entradas:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}
