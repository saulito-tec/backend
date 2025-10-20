import {
  getReportesPorAñoService,
  getReportesPorMesService,
  getDetalleEntradaService,
  getDetalleSalidaService,
} from '../services/reportesService.ts'

export const getReportesPorAño = async (req, res) => {
  const data = await getReportesPorAñoService()
  res.json({ success: true, data })
}

export const getReportesPorMes = async (req, res) => {
  const { year, month } = req.params
  const result = await getReportesPorMesService(Number(year), Number(month))
  // Service now returns { count, data } for performance
  res.json({ success: true, count: result.count, data: result.data })
}

export const getReporteDetalle = async (req, res) => {
  const { year, month, day, tipo } = req.params
  const params = { year: Number(year), month: Number(month), day: Number(day) }

  const result =
    tipo === 'entrada'
      ? await getDetalleEntradaService(params)
      : await getDetalleSalidaService(params)

  // Services now return { usuario, data }
  res.json({
    success: true,
    usuario: result.usuario,
    data: result.data,
  })
}
