import { Router } from 'express'
import {
  getAllSalidas,
  getSalidaById,
  createSalida,
} from '../controllers/salidas.controller.js'

const router = Router()

router.get('/', getAllSalidas)
router.get('/:id', getSalidaById)
router.post('/', createSalida)

export default router
