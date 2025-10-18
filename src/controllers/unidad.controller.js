import {
  getAllUnidadesService,
  createUnidadService,
} from '../services/unidadesService.ts'

export const getAllUnidades = async (req, res) => {
  try {
    const unidades = await getAllUnidadesService()
    res.json({ success: true, data: unidades })
  } catch (error) {
    console.error('Error al obtener unidades:', error)
    res
      .status(500)
      .json({ success: false, message: 'Error al obtener unidades' })
  }
}

export const createUnidad = async (req, res) => {
  try {
    const { unidad } = req.body
    if (!unidad) {
      return res
        .status(400)
        .json({ success: false, message: 'El campo "unidad" es obligatorio' })
    }

    const nuevaUnidad = await createUnidadService({ unidad })
    res.status(201).json({ success: true, data: nuevaUnidad })
  } catch (error) {
    console.error('Error al crear unidad:', error)
    res.status(500).json({ success: false, message: 'Error al crear unidad' })
  }
}
