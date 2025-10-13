import { Router } from 'express'
import {
  getEntradaById,
  getAllEntradas,
  createEntrada,
} from '../controllers/entradas.controller.js'

const router = Router()

// GET /api/entradas
router.get('/', getAllEntradas)

// GET /api/entradas/:id
router.get('/:id', getEntradaById)

// POST /api/entradas
router.post('/', createEntrada)

export default router
