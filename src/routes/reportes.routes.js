import { Router } from 'express'
import {
  getReportesPorAño,
  getReportesPorMes,
  getReporteDetalle,
} from '../controllers/reportes.controller.js'

const router = Router()

// GET /api/reportes -> lista años y meses con movimientos
router.get('/', getReportesPorAño)

// GET /api/reportes/:year/:month -> lista operaciones de ese mes
router.get('/:year/:month', getReportesPorMes)

// GET /api/reportes/:year/:month/:day/:tipo -> detalle de día (entrada/salida)
router.get('/:year/:month/:day/:tipo', getReporteDetalle)

export default router
