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
  const data = await getReportesPorMesService(Number(year), Number(month))
  res.json({ success: true, data })
}

export const getReporteDetalle = async (req, res) => {
  const { year, month, day, tipo } = req.params
  const params = { year: Number(year), month: Number(month), day: Number(day) }

  const data =
    tipo === 'entrada'
      ? await getDetalleEntradaService(params)
      : await getDetalleSalidaService(params)

  res.json({ success: true, data })
}
