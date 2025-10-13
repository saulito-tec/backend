import { Router } from 'express'
import {
  getAllInventario,
  getInventarioById,
  updateInventario,
} from '../controllers/inventario.controller.js'

const router = Router()

// GET /api/inventario
router.get('/', getAllInventario)

// GET /api/inventario/:id
router.get('/:id', getInventarioById)

// PUT /api/inventario/:id
router.put('/:id', updateInventario)

export default router
